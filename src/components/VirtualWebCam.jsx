import React from "react";
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from "@tensorflow/tfjs";

class BodyPixEnabledWebCam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      net: null,
    };
    this.videoTag = React.createRef();
    this.canvasTag = React.createRef();
  }

  componentDidMount() {
    // getting access to webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoTag.current.srcObject = stream;

        this.videoTag.current.onloadeddata = (event) => {
          console.log(
            "Yay! The readyState just increased to  " +
              "HAVE_CURRENT_DATA or greater for the first time."
          );
          if (this.state.net === null) {
            bodyPix
              .load(this.props.bodypixConfig)
              .catch((error) => {
                console.log(error);
                this.props.onError();
              })
              .then((objNet) => {
                this.setState({ net: objNet });
                this.detectBody();
                this.props.onLoaded(this.props.bodypixConfig);
              });
          }
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  detectBody = () => {
    if (this.state.net != null) {
      this.state.net
        .segmentPerson(this.videoTag.current, {
          flipHorizontal: true,
          internalResolution: "medium",
          segmentationThreshold: 0.7,
        })
        .then((personSegmentation) => {
          this.drawBody(personSegmentation);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    requestAnimationFrame(this.detectBody);
  };

  drawBody = (personSegmentation) => {
    this.canvasTag.current
      .getContext("2d")
      .drawImage(
        this.videoTag.current,
        0,
        0,
        this.props.width,
        this.props.height
      );
    let imageData = this.canvasTag.current
      .getContext("2d")
      .getImageData(0, 0, this.props.width, this.props.height);

    let pixel = imageData.data;
    for (let p = 0; p < pixel.length; p += 4) {
      if (personSegmentation.data[p / 4] == 0) {
        pixel[p + 3] = 0;
      }
    }

    const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
    const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };
    const backgroundDarkeningMask = bodyPix.toMask(
      personSegmentation,
      foregroundColor,
      backgroundColor
    );

    const opacity = 0.7;
    const maskBlurAmount = 9;
    const flipHorizontal = false;

    bodyPix.drawMask(
      this.canvasTag.current,
      this.videoTag.current,
      backgroundDarkeningMask,
      opacity,
      maskBlurAmount,
      flipHorizontal
    );
    this.canvasTag.current.getContext("2d").putImageData(imageData, 0, 0);
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <video
          id={this.props.id}
          ref={this.videoTag}
          width={this.props.width}
          height={this.props.height}
          autoPlay
          title={this.props.title}
          style={{ display: "none" }}
        ></video>
        <canvas
          className="person"
          ref={this.canvasTag}
          width={this.props.width}
          height={this.props.height}
        ></canvas>
      </div>
    );
  }
}

export default BodyPixEnabledWebCam;
