import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import "semantic-ui-css/semantic.min.css";
import Loader from "./Loader";

class App extends React.Component {
    state = { lat: null, errorMessage: "" };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ lat: position.coords.latitude });
            },
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        color: "",
                        backgroundColor: "#FF2626",
                    }}
                >
                    <h1 style={{ fontSize: "3rem" }}>
                        Error: {this.state.errorMessage}
                    </h1>
                </div>
            );
        }
        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Loader message="Please accept location request" />;
    }

    render() {
        return <div className="border red">{this.renderContent()}</div>;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
