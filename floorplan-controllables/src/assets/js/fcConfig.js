let fcConfig = {
    //Size of lights
    lightScale: 2,
    floorplans: {
        house: {
            imageURL: "https://dciarletta.github.io/d3-floorplan/Sample_Floorplan.jpg",
            //Locations and properties of lights
            lightConfigs: {
                default: {
                    lights: [{ x: 12, y: 12, id: "KITCHEN_LIGHT1", on: true, group: 'living room' },
                        { x: 32, y: 12, id: "LIVING_ROOM_LIGHT1", on: false },
                        { x: 22.2, y: 14.5, id: "LIVING_ROOM_LIGHT2", on: false },
                    ],
                    groups: [
                        'living room'
                    ]
                }
            },
            get currentLightConfig() { return this.lightConfigs.default },
        }
    },
    get currentFloorplan() { return this.floorplans.house },
};

export default fcConfig;