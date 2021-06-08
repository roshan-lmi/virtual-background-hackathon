import React from "react";
import VirtualWebCam from "./VirtualWebCam";

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
      },
      images: [
        {
          url: "/img/backgrounds/bg6.jpg",
        },
        {
          url: "/img/backgrounds/bg310.jpg",
        },
        {
          url: "/img/backgrounds/bg47.jpg",
        },
        {
          url: "/img/backgrounds/bg39.jpg",
        },
        {
          url: "/img/backgrounds/bg21.jpg",
        },
        {
          url: "/img/backgrounds/bg8.jpg",
        },
      ],
    };
  }

  webcamRef = null;

  selectImage(image, index) {
    this.setState({
      ...this.state,
      selected_resource: image,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="full-contain">
          <div className="main-contain">
            <div>
              <div className="title-b">Webcam</div>
              <div class="background-replacement">
                <img src={this.state.selected_resource.url} />
              </div>
              {this.state.isLoading === true && (
                <div className="loading-area">
                  <span>Loading..</span>
                </div>
              )}
              <VirtualWebCam
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
              />
            </div>
            <div className="rhs">
              <div className="choose-an-image">
                <div className="title-b">Choose Background Images</div>
                <div className="mgrid">
                  {this.state.images.map((item, index) => {
                    if (item.url === this.state.selected_resource.url) {
                      return (
                        <div
                          className="selectable"
                          onClick={() => {
                            this.selectImage(item, index);
                          }}
                        >
                          <div className="selected-bar" />
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
