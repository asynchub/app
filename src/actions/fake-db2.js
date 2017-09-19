export const db = {

  organizer : {},

  stocks : {},

  customers : {},

  counter : {},

  sourceFileTree : {},

  syncFileTree : {},

  processes : {
    byId : {
      "process1" : {
        id : "process1",
        workers : [ "worker1", "worker2" ],
        machines : [ "machine3" ],
      },
      "process2" : {
        id : "process2",
        workers : [ "worker1", "worker2" ],
        machines : [],
      },
      "process3" : {
        id : "process3",
        workers : [ "worker1" ],
        machines : [ "machine4" ],
      }
    },
    allIds : [ "process1", "process2", "process3" ]
  },

  resourcesEngineers : {
    byId : {
      "engineer1" : {
        id : "engineer1",
        rate : 20,
        machines: [ "machine1" ],
      },
      "engineer2" : {
        id : "engineer2",
        rate : 30,
        machines: [ "machine2" ],
      }
    },
    allIds : [ "engineer1", "engineer2" ]
  },

  resourcesWorkers : {
    byId : {
      "worker1" : {
        id : "worker1",
        rate : 15,
        machines: [ "machine3" ],
      },
      "worker2" : {
        id : "worker2",
        rate : 12,
        machines: [ "machine4" ],
      }
    },
    allIds : [ "worker1", "worker2" ]
  },

  resourcesMachines : {
    byId : {
      "machine1" : {
        id : "machine1",
        rate : 15,
        workers : [],
        engineers : [ "engineer1" ]
      },
      "machine2" : {
        id : "machine2",
        rate : 12,
        workers: [],
        engineers : [ "engineer2" ]
      },
      "machine3" : {
        id : "machine3",
        rate : 12,
        workers : [ "worker1" ],
        engineers : []
      },
      "machine4" : {
        id : "machine4",
        rate : 12,
        workers : [ "worker2"],
        engineers : []
      }
    },
    allIds : [ "machine1", "machine2", "machine3", "machine4" ]
  },

  materials : {
    byId : {
      "steel1" : {
        id : "steel1",
        grade : "S355J2G3",
        density : 7.85,
        price : 0.95
      },
      "steel2" : {
        id : "steel2",
        grade : "S235JRG2",
        density : 7.85,
        price : 0.84
      },
      "steel3" : {
        id : "steel3",
        grade : "S490ML",
        density : 7.85,
        price : 0.84
      }
    },
    allIds : [ "steel1", "steel2", "steel3" ]
  },

  materialStds : {
    byId : {
      "std1" : {
        id : "st1",
        title : "EN10025",
        tolerances : [],
      },
      "std2" : {
        id : "st1",
        title : "EN10018",
        tolerances : [],
      },
      "std3" : {
        id : "st1",
        title : "EN10010",
        tolerances : [],
      }
    },
    allIds : [ "std1", "std2", "std3" ]
  },

  profiles : {
    byId : {
      "profile1" : {
        id : "profile1",
        title : "Plate",
        thicknesses : [ 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 25, 30 ],
        oDiameters : [],
        iDiameters : [],
        side1 : [],
        side2 : [],
        widths : [ 1200, 1800, 2000, 2400 ],
        lengths : [ 6000, 8000, 12000 ]
      },
      "profile2" : {
        id : "profile2",
        title : "Angle",
        thicknesses : [ 1, 2, 3, 4, 5, 6, 8, 10, 12 ],
        oDiameters : [],
        iDiameters : [],
        side1 : [ 10, 12, 15, 20, 25, 30, 40, 50 ],
        side2 : [ 10, 12, 15, 20, 25, 30, 40, 50 ],
        widths : [],
        lengths : [ 6000, 8000 ]
      },
      "profile3" : {
        id : "profile3",
        title : "Round",
        thicknesses : [],
        oDiameters : [ 10, 12, 15, 20, 25, 30, 40, 50, 70, 90, 120 ],
        iDiameters : [],
        side1 : [],
        side2 : [],
        widths : [],
        lengths : [ 6000, 8000 ]
      },
      "profile4" : {
        id : "profile4",
        title : "U-bar",
        thicknesses : [],
        oDiameters : [],
        iDiameters : [],
        side1 : [ 40, 60, 80, 100 ],
        side2 : [ 80, 80, 100, 140, 160, 200 ],
        widths : [],
        lengths : [ 6000, 8000 ]
      },
      "profile5" : {
        id : "profile5",
        title : "Flat-bar",
        thicknesses : [],
        oDiameters : [],
        iDiameters : [],
        side1 : [ 1, 2, 3, 4, 5, 6, 8, 10, 12 ],
        side2 : [ 10, 20, 25, 30, 40, 80 ],
        widths : [],
        lengths : [ 6000, 8000 ]
      },
      "profile6" : {
        id : "profile6",
        title : "Pipe",
        thicknesses : [],
        oDiameters : [ 10, 12, 15, 20, 25, 30, 40, 50, 70, 90, 120 ],
        iDiameters : [],
        side1 : [],
        side2 : [],
        widths : [],
        lengths : [ 6000, 8000 ]
      },
      "profile7" : {
        id : "profile7",
        title : "HEB",
        thicknesses : [],
        oDiameters : [],
        iDiameters : [],
        side1 : [ 80, 100, 120, 150, 200, 280 ],
        side2 : [ 120, 240, 320, 400, 420 ],
        widths : [],
        lengths : [ 6000, 8000 ]
      },
    },
    allIds : [ "profile1", "profile2", "profile3", "profile4", "profile5", "profile6", "profile7" ]
  },

  products : {
    byId: {
      "product1" : {
        id : "product1",
        title : "SPS",
        description : "Super Product S",
        time : 31,
        timeStart : 10-10-2017,
        timeEnd : 10-11-2017,
        cost : 34000,
        weight : 7200
      },
      "product2" : {
        id : "product2",
        title : "SPF",
        description : "Super Product F",
        time : 34,
        timeStart : 11-11-2017,
        timeEnd : 15-12-2017,
        cost : 37000,
        weight : 7800
      }
    },
    allIds : [ "product1", "product2" ]
  },

  parts : {
    byId : {
      "assembly1" : {
        fromProduct: "product1",
        id : "assembly1",
        key : "assembly1",
        title : "SPS-00-000",
        description : "Main Assembly",
        material : "",
        materialStd : "",
        profile : "",
        profileStd : "",
        profileSize : "",
        length : 10200,
        width : 5210,
        qtyInParentAssembly : 2,
        totalQty : null,
        weightOfEach : 0,
        totalWeight : null,
        // parents : [],
        childrenIds : [ "assembly2", "assembly3", "detail3" ],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      },
      "assembly2" : {
        fromProduct: "product1",
        id : "assembly2",
        key : "assembly2",
        title : "SPS-10-000",
        description : "Sub Assembly 10",
        material : "",
        materialStd : "",
        profile : "",
        profileStd : "",
        profileSize : "",
        length : 2300,
        width : 530,
        qtyInParentAssembly : 4, // recalculated in table (map over cells, to be affected or rendered)
        totalQty: null, // null if imported weight is stated as qty per parent assembly
        weightOfEach: 0,
        totalWeight: null,
        // parents : [ "assembly1" ],
        childrenIds : [ "detail1", "detail2" ],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      },
      "assembly3" : {
        fromProduct: "product1",
        id : "assembly3",
        key : "assembly3",
        title : "SPS-20-000",
        description : "Sub Assembly 20",
        material : "",
        materialStd : "",
        profile : "",
        profileStd : "",
        profileSize : "",
        length : 7900,
        width : 570,
        qtyInParentAssembly : 4,
        totalQty: null,
        weightOfEach: 0,
        totalWeight: null,
        // parents: [ "assembly1" ],
        childrenIds : [ "detail1", "detail2", "detail3", "detail4" ],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      },
      "detail1" : {
        fromProduct: "product1",
        id : "detail1",
        key : "detail1",
        title : "SPS-20-001",
        description : "Detail1",
        material : "S355J2G3",
        materialStd : "EN10025",
        profile : "Plate",
        profileStd : "EN10210",
        profileSize : "20",
        length : 2000,
        width : 340,
        qtyInParentAssembly : 4,
        totalQty: null,
        weightOfEach: 0,
        totalWeight: null,
        // parents : [ "SPS-20-000", "SPS-10-000" ],
        childrenIds : [],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      },
      "detail2" : {
        fromProduct: "product1",
        id : "detail2",
        key : "detail2",
        title : "SPS-20-002",
        description : "Detail2",
        material : "S355J2G3",
        materialStd : "EN10025",
        profile : "Plate",
        profileStd : "EN10210",
        profileSize : "20",
        length : 2000,
        width : 340,
        qtyInParentAssembly : 6,
        totalQty: null,
        weightOfEach: 0,
        totalWeight: null,
        // parents : [ "SPS-20-000", "SPS-10-000" ],
        childrenIds : [],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      },
      "detail3" : {
        fromProduct: "product1",
        id : "detail3",
        key : "detail3",
        title : "SPS-20-003",
        description : "Detail3",
        material : "S235JRG2",
        materialStd : "EN10025",
        profile : "Plate",
        profileStd : "EN10210",
        profileSize : "20",
        length : 2000,
        width : 340,
        qtyInParentAssembly : 2,
        totalQty: null,
        weightOfEach: 0,
        totalWeight: null,
        // parents : [ "SPS-20-000" ],
        childrenIds : [],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      },
      "detail4" : {
        fromProduct: "product1",
        id : "detail4",
        key : "detail4",
        title : "SPS-20-004",
        description : "Detail4",
        material : "S235JRG2",
        materialStd : "EN10025",
        profile : "Plate",
        profileStd : "EN10210",
        profileSize : "20",
        length : 2000,
        width : 340,
        qtyInParentAssembly : 10,
        totalQty: null,
        weightOfEach: 0,
        totalWeight: null,
        // parents : [ "SPS-20-000" ],
        childrenIds : [],
        children : [],
        // processes : [],
        time : 0,
        cost : 0
      }
    },
    allIds : [ "assembly1", "assembly2", "assembly3", "detail1", "detail2", "detail3", "detail4" ]
  }
}
