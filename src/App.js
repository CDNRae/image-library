import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";

class App extends Component {
    state = {
        images: [
            {
                id: 1,
                path:
                    "D:/Creative/Dragon Age/References/George/DAOrigins 2019-11-23 16-32-08-25.bmp",
                name: "DAOrigins 2019-11-23 16-32-08-25",
                tags: ["one", "two", "three"],
            },
            {
                id: 2,
                path:
                    "D:/Creative/Dragon Age/References/George/DAOrigins 2020-11-05 21-26-01-64.bmp",
                name: "DAOrigins DAOrigins 2020-11-05 21-26-01-64",
                tags: ["one", "two", "three"],
            },
            {
                id: 3,
                path:
                    "D:/Creative/Dragon Age/References/George/DAOrigins 2020-11-05 21-34-25-80.bmp",
                name: "DAOrigins 2020-11-05 21-34-25-80",
                tags: ["one", "two", "three"],
            },
            {
                id: 4,
                path:
                    "D:/Creative/Dragon Age/References/George/DAOrigins 2019-11-23 16-32-08-25.bmp",
                name: "DAOrigins 2019-11-23 16-32-08-25",
                tags: ["one", "two", "three"],
            },
            {
                id: 5,
                path:
                    "D:/Creative/Dragon Age/References/George/DAOrigins 2020-11-05 21-26-01-64.bmp",
                name: "DAOrigins DAOrigins 2020-11-05 21-26-01-64",
                tags: ["one", "two", "three"],
            },
            {
                id: 6,
                path:
                    "D:/Creative/Dragon Age/References/George/DAOrigins 2020-11-05 21-34-25-80.bmp",
                name: "DAOrigins 2020-11-05 21-34-25-80",
                tags: ["one", "two", "three"],
            },
        ],
        showImageName: false,
    };

    render() {
        return (
            <div>
                <ImageGallery
                    images={this.state.images}
                    showImageName={this.state.showImageName}
                ></ImageGallery>
            </div>
        );
    }
}

export default App;
