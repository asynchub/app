organizer {}
products {}
resources {}
stocks {}
materials {}
customers {}
counter {}
sourceFileTree {}
syncFileTree {}

        // calculation and rendering of properties, which to store, which to calculate upon render.
        // should the each cell of qty column on the page be a component, in order to rerender only particular cells? yes.
        // they won't be so many: 42 rows per screen with + (21 x 2) to prepare for scrolling up or down.
        // pagination vs. scrolling:
        // pagination has better observation for comparison of closest positions and product tree and so on. so choose scrolling

        // upon automated import from sourceFileTree the user is promted to choose:
        // which weight is being imported from tables of imported docs: weightOfEach or weightTotal
        // which qty is being imported from tables from imported docs: qtyInParentAssembly or qtyTotal
          
        // should we keep calculated properties in database?
        // is it leaner to make these calculations on render in browser of each client? yes.
        // what is rendered - is calculated, 
        // what will be rendered - will be calculated however with latest data.
        // calculated numbers upon render: (map over cells, to be rendered) shall be fast enough
        // calculated numbers for database: (map over tree's branches of parent assemblies throughout root assembly)
productTree {
  assemblies : {
    byId : {
      "assembly1" : {
        id : "assembly1",
        title : "SPS-00-000",
        description : "Main Assembly",
        material : "",
        qtyInParentAssembly : 2,
        totalQty: null,
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : []
        childrenAssemblies : [ "assembly2", "assembly3" ],
        details : []
      }
      "assembly2" : {
        id : "assembly2",
        title : "SPS-10-000",
        description : "Sub Assembly 10",
        material : "",
        qtyInParentAssembly : "4", // recalculated in table (map over cells, to be affected or rendered)
        totalQty: null, // null if imported weight is stated as qty per parent assembly
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : [ "assembly1" ],
        childrenAssemblies : [],
        details : [ "detail1", "detail2" ]
      }
      "assembly3" : {
        id : "assembly3",
        title : "SPS-20-000",
        description : "Sub Assembly 20",
        material : "",
        qtyInParentAssembly : "4",
        totalQty: null,
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : [ "assembly1" ],
        childrenAssemblies : [],
        details : [ "detail1", "detail2", "detail3", "detail4" ]
      }
    }
    allIds : [ "assembly1", "assembly2", "assembly3" ]
  }
  details : {
    byId : {
      "detail1" : {
        id : "detail1",
        title : "SPS-20-001",
        description : "Detail1",
        material : "STEEL",
        qtyInParentAssembly : "4",
        totalQty: null,
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : [ "SPS-20-000", "SPS-10-000" ]
      }
      "detail2" : {
        id : "detail2",
        title : "SPS-20-002",
        description : "Detail2",
        material : "STEEL",
        qtyInParentAssembly : "6",
        totalQty: null,
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : [ "SPS-20-000", "SPS-10-000" ]
      }
      "detail3" : {
        id : "detail3",
        title : "SPS-20-003",
        description : "Detail3",
        material : "STEEL",
        qtyInParentAssembly : "2",
        totalQty: null,
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : [ "SPS-20-000" ]
      }
      "detail4" : {
        id : "detail4",
        title : "SPS-20-004",
        description : "Detail4",
        material : "STEEL",
        qtyInParentAssembly : "10",
        totalQty: null,
        weightOfEach: 0,  
        totalWeight: null,
        parentAssemblies : [ "SPS-20-000" ]
      }
    }
    allIds: [ "detail1", "detail2", "detail3", "detail4" ]
  }
}
