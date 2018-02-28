import React from "react";
import {connect} from "react-redux";
import {addFiles} from "../../AC/files";
import PropTypes from "prop-types";

class FileUploader extends React.Component {

    static propTypes = {
        // from props
        addFiles: PropTypes.func.isRequired,
        model: PropTypes.string.isRequired,
        modelId: PropTypes.number.isRequired
    };

    handleChange = (e) => {
        e.preventDefault();

        this.props.addFiles(
            e.target.files,
            this.props.model,
            this.props.modelId
        )
    };

    render() {
        return (
            <input
                type="file"
                multiple="true"
                onChange={this.handleChange}
            />
        )
    }

}

export default connect(null, {
    addFiles
})(FileUploader);