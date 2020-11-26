import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import TitleBar from "./components/TitleBar/TitleBar";

class App extends Component {
    render() {
        return (
            <div>
                <TitleBar />
                <ImageGallery />
            </div>
        );
    }
}

export default App;
