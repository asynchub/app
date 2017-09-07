organizer {}
products {}
resources {}
stocks {}
materials {}
customers {}
counter {}
sourceFileTree {}
syncFileTree {}
productTree {
  assemblies : {
    byId : {
      "assembly1" : {
        id : "assembly1",
        title : "SPS-00-000",
        description : "Main Assembly",
        material : "",
        qtyInParentAssembly : 2,
        weightOfEach: 0,
        // weightTotal recalculated on change of each qty cell in UI in table in qty column 
        // (should the each cell of qty column be a component, in order to rerender only particular cells?) 
        // (map over tree branches of parent assemblies throughout root assembly)
        weightTotal: 0,
        parentAssemblies : []
        childrenAssemblies : [ "assembly2", "assembly3" ],
        details : []
      }
      "assembly2" : {
        id : "assembly2",
        title : "SPS-10-000",
        description : "Sub Assembly 10",
        material : "",
        qtyInParentAssembly : "4", // recalculated in table (map over trees of parent assemblies to root direction and sum products)
        parentAssemblies : [ "assembly1" ],
        childrenAssemblies : [],
        assemblies : [],
        details : []
      }
      "assembly3" : {
        id : "assembly3",
        title : "SPS-20-000",
        description : "Sub Assembly 20",
        material : "",
        qtyInParentAssembly : "4",
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
        parentAssemblies : [ "SPS-20-000" ]
      }
      "detail2" : {
        id : "detail2",
        title : "SPS-20-002",
        description : "Detail2",
        material : "STEEL",
        qtyInParentAssembly : "6",
        parentAssemblies : [ "SPS-20-000" ]
      }
      "detail3" : {
        id : "detail3",
        title : "SPS-20-003",
        description : "Detail3",
        material : "STEEL",
        qtyInParentAssembly : "2",
        parentAssemblies : [ "SPS-20-000" ]
      }
      "detail4" : {
        id : "detail4",
        title : "SPS-20-004",
        description : "Detail4",
        material : "STEEL",
        qtyInParentAssembly : "10",
        parentAssemblies : [ "SPS-20-000" ]
      }
    }
    allIds: [ "detail1", "detail2", "detail3", "detail4" ]
  }
}
