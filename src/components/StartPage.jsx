import React from "react";
import BodyPixEnabledWebCam from "./BodyPixEnabledWebCam";

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      net: null,
      slowConfig: {
        architecture: "ResNet50",
        outputStride: 16,
        multiplier: 1,
        quantBytes: 2,
      },
      selected_resource: {
        url: "/img/backgrounds/bg6.jpg",
        selected: true,
      },
      selected_resource_type: "image",
      images: [
        {
          url: "/img/backgrounds/bg6.jpg",
          selected: true,
        },
        {
          url: "/img/backgrounds/bg310.jpg",
          selected: false,
        },
        {
          url: "/img/backgrounds/bg47.jpg",
          selected: false,
        },
        {
          url: "/img/backgrounds/bg39.jpg",
          selected: false,
        },
        {
          url: "/img/backgrounds/bg21.jpg",
          selected: false,
        },
        {
          url: "/img/backgrounds/bg8.jpg",
          selected: false,
        },
      ],
    };
  }

  webcamRef = null;

  selectImage(image, index) {
    this.deselectAllImages();
    let images = this.state.images;
    images[index].selected = true;
    this.setState({
      ...this.state,
      images: images,
      selected_resource: image,
      selected_resource_type: "image",
    });
  }

  deselectAllImages() {
    let images = this.state.images;
    for (let index = 0; index < images.length; index++) {
      images[index].selected = false;
    }
    this.setState({
      ...this.state,
      images: images,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="full-contain">
          <div className="main-contain">
            <div>
              <div className="title-b">Default Camera Source</div>
              <div className="camera-zone">
                <div class="background-replacement">
                  {this.state.selected_resource_type == "image" && (
                    <img src={this.state.selected_resource.url} />
                  )}
                </div>
                {this.state.isLoading == true && (
                  <div className="loading-area">
                    <span>Loading..</span>
                  </div>
                )}
                <BodyPixEnabledWebCam
                  onLoaded={(config) => {
                    this.setState({
                      ...this.state,
                      isLoading: false,
                    });
                  }}
                  onError={() => {
                    this.setState({
                      ...this.state,
                      isLoading: false,
                    });
                  }}
                  width={532}
                  height={400}
                  bodypixConfig={this.state.slowConfig}
                ></BodyPixEnabledWebCam>
              </div>
            </div>
            <div className="rhs">
              <div className="choose-an-image">
                <div className="title-b">Choose an Image</div>
                <div className="mgrid">
                  {this.state.images.map((item, index) => {
                    if (item.selected == true) {
                      return (
                        <div
                          className="selectable selected"
                          onClick={() => {
                            this.selectImage(item, index);
                          }}
                        >
                          <div className="selected-bar">Currently Selected</div>
                          <img src={item.url} />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="selectable"
                          onClick={() => {
                            this.selectImage(item, index);
                          }}
                        >
                          <img src={item.url} />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartPage;
