Page({
    data: {
        markers: [{
            iconPath: "../resources/addr.png",
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 50,
            height: 50
        }],
       
        controls: [{
            id: 1,
            iconPath: '../resources/addr.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }],
        circles:[{
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF0000DD',
            fillColor: '#7cb5ec00',
            radius: 1500,
            strokeWidth: 2
        },{
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF0000DD',
            fillColor: '#7cb5ec00',
            radius: 5000,
            strokeWidth: 2
        },
        {
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF0000DD',
            fillColor: '#7cb5ec00',
            radius: 25000,
            strokeWidth: 2
        },
        {
            latitude: 23.099994,
            longitude: 113.324520,
            color: '#FF000088',
            fillColor: '#7cb5ec00',
            radius: 10000,
            strokeWidth: 2
        }]
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
    }
})