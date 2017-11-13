import React, { Component } from 'react';
import TableCell from './engineer-table-cell';
import ButtonGroup from './engineer-button-group';
import SortableTree, {
  getFlatDataFromTree,
  getTreeFromFlatData,
  addNodeUnderParent, // for driving
  removeNodeAtPath,   // for driving
  changeNodeAtPath,   // for driving
  // walk,
  getNodeAtPath
} from 'react-sortable-tree';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchPartsFromDB,
  // buildPartsTreeOfPartsFromDB,
  renderList,
  editPartNode,
  copyPart_UI,
  removePart_UI,
  addPart,
  removePart,
  cleanClipBoard_UI,
  addChild,
  addChildBlank
} from '../actions/index';

class EngineerSortableTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],

      // for search
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnVisibilityToggle = this.handleOnVisibilityToggle.bind(this);
    this.handleOnMoveNode = this.handleOnMoveNode.bind(this);

    // for driving
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDelButtonClick = this.handleDelButtonClick.bind(this);

    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    this.handleAddChildButtonClick = this.handleAddChildButtonClick.bind(this);
    this.handleAddChildBlankButtonClick = this.handleAddChildBlankButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchPartsFromDB();
  }

  componentWillReceiveProps(nextProps) {
    console.log('props received:', nextProps.initialData);
    if (this.props.initialData.allIds.length !== nextProps.initialData.allIds.length) { // .allIds.length
      this.setState({
        treeData: getTreeFromFlatData({
          flatData: nextProps.initialData.allIds.map(node => {
            const part = nextProps.initialData.byId[node];
            return {
              id: part.id,
              title: part.title,
              name: part.title,
              subtitle: part.description,
              qty: part.qtyInParentAssembly,
              parent: part.parentId,
              expanded: part.toggled,
              checked: node.checked ? node.checked : false,
            }
          }),
          getKey: node => node.id, // resolve a node's key
          getParentKey: node => node.parent, // resolve a node's parent's key
          rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
        })
      });
    }
    // this.setState({ this.state.treeData });
  }


  handleOnChange(treeData) {
    // console.log("handleOnChange: ", treeData)
    /*
    const flatData = getFlatDataFromTree({
      treeData: treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: true, // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node }) => node.id);
    console.log("flatData: ", flatData);
    this.props.renderList(flatData);

    */
    this.setState({ treeData });
  }

  handleOnVisibilityToggle(visiData) {
    const { expanded } = visiData;
    const { id } = visiData.node;
    this.props.editPartNode(id, { toggled: expanded });
  }

  handleOnMoveNode(moveData) {
    const { path, prevPath, node, treeData } = moveData;
    // const treeIndex = path.length > 1 ? path[path.length - 2] : null;
    const parentPath = path.length > 1 ? path.slice(0, path.length - 1) : null;
    console.log("parentPath: ", parentPath);
    const parentNode = getNodeAtPath({
      treeData: treeData,
      path: parentPath,
      getNodeKey: ({ treeIndex }) =>  treeIndex,
      ignoreCollapsed : true
    });
    console.log("parentNode: ", parentNode);

    const prevParentPath = prevPath.length > 1 ? prevPath.slice(0, prevPath.length - 1) : null;
    console.log("prevParentPath: ", prevParentPath);
    const prevParentNode = getNodeAtPath({
      treeData: treeData,
      path: prevParentPath,
      getNodeKey: ({ treeIndex: prevTreeIndex }) =>  prevTreeIndex,
      ignoreCollapsed : true
    });
    console.log("prevParentNode: ", prevParentNode);

    const parent = parentNode ? parentNode.node.id : null;
    const { id, expanded } = node;
    const prevParentId = prevParentNode ? prevParentNode.node.id : null;
    // console.log("prevParentId: ", prevParentId);
    const parentChildren = parentNode ?
      parentNode.node.children.map(child => child.id) :
      null;
    const prevParentChildren = prevParentNode ?
      prevParentNode.node.children.map(child => child.id) :
      null;// this.props.parts.byId[prevParentId].childrenIds;
    // console.log("parentChildren: ", parentChildren);
    // console.log("prevParentChildren: ", prevParentChildren);
    console.log("handleOnMoveNode: ", moveData);
    // console.log("handleOnMoveNode: ", moveData, treeIndex, parentNode);
    // console.log("id, expanded, parent : ", id, expanded, parent);
    if (id !== undefined && expanded !== undefined &&  parent !== undefined) {
      /* editPartNode({ toggled: bool, parentId: string, childrenIds: array }) all optional */
      this.props.editPartNode(id, { parentId: parent });
      this.props.editPartNode(prevParentId, { childrenIds: prevParentChildren });
      this.props.editPartNode(parent, { childrenIds: parentChildren });
    }

    // console.log("handleOnMoveNode: ", moveData);
    // return true;
  }


  componentDidUpdate(prevProps, prevState) {
    const flatData = getFlatDataFromTree({
      treeData: this.state.treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: true, // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node }) => node.id);
    console.log("flatData: ", flatData);
    this.props.renderList(flatData);
    // this.setState({ this.state.treeData });
  }

  // for driving
  handleAddChildButtonClick(event) {
    const parentId = event.target.id;
    const parent = this.props.parts.byId[parentId];
    this.props.addChild(parent, parentId);
  }

  handleAddChildBlankButtonClick(event) {
    const parentId = event.target.id;
    const parent = this.props.parts.byId[parentId];
    this.props.addChildBlank(parent, parentId);
  }


  handleCheckBoxClick(event) {
    const { parts } = this.props;
    // console.log(event.target)
    const { id } = event.target;
    const part = parts.byId[id];
    if (event.target.checked) {
      this.props.copyPart_UI(part, id);
    }
    if (!event.target.checked) {
      this.props.removePart_UI(id);
    }
  }


  handleAddButtonClick(event) {
    const { clipBoard_UI, parts } = this.props;
    const partsToPaste = clipBoard_UI.byId;
    const partIdsToPaste = clipBoard_UI.allIds;
    if (!partIdsToPaste.length) {
      this.props.addPart();
      return;
    } else {

      partIdsToPaste.map(id => {
        let part = partsToPaste[id];
        this.props.addPart(parts.byId, part);
      });

      this.props.cleanClipBoard_UI();
    }
  }

  handleDelButtonClick(event) {
    const { clipBoard_UI, parts } = this.props;
    const { allIds } = clipBoard_UI;
    allIds.map(id => {
      this.props.removePart(parts.byId, parts.allIds, id);
    })
    this.props.cleanClipBoard_UI();
  }


  render() {
    // for search:
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;
    console.log('searchString: ', searchString);

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });
    // for search

    // const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div>

        <form
          style={{ display: 'inline-block', height: 64, padding: 12 }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            id="find-box"
            type="text"
            placeholder="Search..."
            style={{ fontSize: '1rem' }}
            value={searchString}
            onChange={event =>
              this.setState({ searchString: event.target.value })}
          />

          <button
            type="button"
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button>

          <button
            type="submit"
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          >
            &gt;
          </button>

          <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span>
        </form>

        <div style={{ height: 52000 }} >
          <SortableTree
            treeData={this.state.treeData}
            onChange={this.handleOnChange}
            onVisibilityToggle={this.handleOnVisibilityToggle}
            onMoveNode={this.handleOnMoveNode}
            rowHeight={64}
            scaffoldBlockPxWidth={42}

            // for driving
            generateNodeProps={({ node, path }) => ({
              title: (
                <table style={{ width: 132 }}>

                    <tr>
                      <TableCell
                      partId={node.id}
                      partProperty="title"
                      width={112}
                      />
                      <TableCell
                      partId={node.id}
                      partProperty="qtyInParentAssembly"
                      type="number"
                      width={32}
                      />
                    </tr>

                </table>
              ),

              // buttons overloading UI
              buttons: [
                <ButtonGroup>
                  <button id={node.id}
                  onClick={this.handleAddChildBlankButtonClick}>+new</button>
                  <button id={node.id}
                  onClick={this.handleAddChildButtonClick}>+copy</button>
                  <span> </span>
                  <input type="checkbox" id={node.id}
                  onClick={this.handleCheckBoxClick}
                  checked={this.props.clipBoard_UI.byId[node.id]} />
                  <span> </span>
                  <button
                  onClick={this.handleAddButtonClick}>copy</button>
                  <button
                  onClick={this.handleDelButtonClick}>del</button>
                </ButtonGroup>
              ],
            })}

            // for search:
            //
            // Custom comparison for matching during search.
            // This is optional, and defaults to a case sensitive search of
            // the title and subtitle values.
            // see `defaultSearchMethod` in https://github.com/fritz-c/react-sortable-tree/blob/master/src/utils/default-handlers.js
            searchMethod={customSearchMethod}
            //
            // The query string used in the search. This is required for searching.
            searchQuery={searchString}
            //
            // When matches are found, this property lets you highlight a specific
            // match and scroll to it. This is optional.
            searchFocusOffset={searchFocusIndex}
            //
            // This callback returns the matches from the search,
            // including their `node`s, `treeIndex`es, and `path`s
            // Here I just use it to note how many matches were found.
            // This is optional, but without it, the only thing searches
            // do natively is outline the matching nodes.
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ parts, clipBoard_UI }) {
  return { parts, clipBoard_UI };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPartsFromDB,
    // buildPartsTreeOfPartsFromDB,
    renderList,
    editPartNode,
    copyPart_UI,
    removePart_UI,
    addPart,
    removePart,
    cleanClipBoard_UI,
    addChild,
    addChildBlank
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EngineerSortableTree);

/* // good for input of type number
<input
defaultValue={node.qty}
type={'number'}
style={{width: 42, border: 'none'}}>
</input>
*/

/* // codebase for search implementation
import React, { Component } from 'react';
import SortableTree from '../../src';

export default class App extends Component {
  constructor(props) {
    super(props);

    const title = 'Hay';

    // For generating a haystack (you probably won't need to do this)
    const getStack = (left, hasNeedle = false) => {
      if (left === 0) {
        return hasNeedle ? { title: 'Needle' } : { title };
      }

      return {
        title,
        children: [
          {
            title,
            children: [getStack(left - 1, hasNeedle && left % 2), { title }],
          },
          { title },
          {
            title,
            children: [
              { title },
              getStack(left - 1, hasNeedle && (left + 1) % 2),
            ],
          },
        ],
      };
    };

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        {
          title: 'Haystack',
          children: [
            getStack(3, true),
            getStack(3),
            { title },
            getStack(2, true),
          ],
        },
      ],
    };
  }

  render() {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    return (
      <div>
        <h2>Find the needle!</h2>
        <form
          style={{ display: 'inline-block' }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            id="find-box"
            type="text"
            placeholder="Search..."
            style={{ fontSize: '1rem' }}
            value={searchString}
            onChange={event =>
              this.setState({ searchString: event.target.value })}
          />

          <button
            type="button"
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button>

          <button
            type="submit"
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          >
            &gt;
          </button>

          <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span>
        </form>

        <div style={{ height: 300 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            //
            // Custom comparison for matching during search.
            // This is optional, and defaults to a case sensitive search of
            // the title and subtitle values.
            // see `defaultSearchMethod` in https://github.com/fritz-c/react-sortable-tree/blob/master/src/utils/default-handlers.js
            searchMethod={customSearchMethod}
            //
            // The query string used in the search. This is required for searching.
            searchQuery={searchString}
            //
            // When matches are found, this property lets you highlight a specific
            // match and scroll to it. This is optional.
            searchFocusOffset={searchFocusIndex}
            //
            // This callback returns the matches from the search,
            // including their `node`s, `treeIndex`es, and `path`s
            // Here I just use it to note how many matches were found.
            // This is optional, but without it, the only thing searches
            // do natively is outline the matching nodes.
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })}
          />
        </div>
      </div>
    );
  }
}
*/

/* treeNodeInput is way better than these two commented out:
(
  <input
    style={{ fontSize: '1.1rem', border: 0 }}
    value={node.name}
    onChange={event => {
      const name = event.target.value;
      this.setState(state => ({
        treeData: changeNodeAtPath({
          treeData: state.treeData,
          path,
          getNodeKey,
          newNode: { ...node, name },
        }),
      }));
      this.props.editPartNode(node.id, { title: name });
    }}
  />
),
*/
/*(
  <div>
    onMouseLeave={this.deactivateEdit} >
      <Input
        type={this.props.type}
        handleDeactivateEdit={this.deactivateEdit}
        handleChange={this.handleChange}
        handleSubmitEdit={this.submitEdit}
        handleActivateEdit={this.activateEdit}
        defaultValue={cellValue}/>
  </div>
)*/

/*
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';
// import _ from 'lodash';

class EngineerTreebeard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
    this.handleOnToggle = this.handleOnToggle.bind(this);
  }

  componentDidMount() {
    this.props.buildPartsTreeOfPartsFromDB();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parts !== this.props.parts) {
      this.props.buildPartsTreeOfPartsFromDB(nextProps.parts);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.partsTree.node !== this.props.partsTree.node) {
        console.log("node changed:", this.props.partsTree.node);
    }
  }


  onToggle(node, toggled) {
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
    this.props.editPartNode(node);
  }

  handleOnToggle(node, toggled) {
    this.onToggle(node, toggled);
  }

  render(){
    return (
      <Treebeard
        data={this.props.partsTree.rootParts}
        onToggle={this.handleOnToggle}
      />
    );
  }
}
*/
