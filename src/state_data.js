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
        id :"assembly1",
        title : "SPS-00-000",
        description : "Main Assembly",
        material : "",
        qtyInAss : "2",
        assemblies : [ "assembly2", "assembly3" ],
        details : []
      }
      "assembly2" : {
        id :"assembly2",
        title : "SPS-10-000",
        description : "Sub Assembly 10",
        material : "",
        qtyInAss : "4",
        assemblies : [],
        details : []
      }
      "assembly3" : {
        id :"assembly3",
        title : "SPS-20-000",
        description : "Sub Assembly 20",
        material : "",
        qtyInAss : "4",
        assemblies : [],
        details : []
      }
    }
    allIds: [ "assembly1", "assembly2", "assembly3" ]
  }
}
