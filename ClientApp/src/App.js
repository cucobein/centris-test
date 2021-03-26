import axios from 'axios';
import React,{Component} from 'react';
import './App.css';
 
class App extends Component {
  
    state = {
      selectedFile: null,
      visibilityButton: 'hide',
      visibilityUpload: "show",
      visibilityloading: null,
      resultTable: null,
      visibilityReturnButton: null,
    };
    
    onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] });
    };
    
    onFileUpload = async (e) => {

      const formData = new FormData();
      formData.append(
        "formFile",
        this.state.selectedFile
      );
      formData.append(
        "fileName",
        this.state.selectedFile.name
      );
      console.log(this.state.selectedFile);

      try
      {
        this.state.visibilityUpload = null;
        this.state.visibilityloading = "Show";
        this.forceUpdate();
        const res = await axios.post("http://localhost:38513/api/file", formData);

        if(res.status == 200)
        {
          this.state.resultTable = res.data;
          this.state.selectedFile = null;
          this.state.visibilityloading = null;
          this.forceUpdate();
        }
        else
        {
          this.state.visibilityUpload = "Show";
          this.state.selectedFile = null;
          this.state.resultTable = null;
          this.state.visibilityloading = null;
          alert("Error, please look at console for details");
          this.forceUpdate();
        }
        console.log(res);
      }
      catch (ex)
      {
        this.state.visibilityUpload = "Show";
        this.state.selectedFile = null;
        this.state.visibilityloading = null;
        this.forceUpdate();
        alert("Error at upload, please try again");
        console.log(ex);
      }

      // axios.post("http://localhost:38513/api/file", formData);
    };

    fileData = () => {
    
      if (this.state.selectedFile)
      {
        if(this.state.selectedFile.type === "text/plain" && this.state.visibilityUpload)
        {
          this.state.visibilityButton = "show";

          return (
  
            <div className="dataContainer">
              <h2>File Details:</h2>

              <p>File Name:</p>
              <p>{this.state.selectedFile.name}</p>

              <p>Last Modified:</p>
              <p>{this.state.selectedFile.lastModifiedDate.toDateString()}</p>

            </div>
          );
        }
        else
        {
          if(this.state.visibilityUpload)
          {
            this.state.visibilityButton = "hide";
            return (
              <div>
                <h3>Please upload a valid *.txt file</h3>
              </div>
            )
          }
        }

      }
      else
      {
        this.state.visibilityButton = "show";
      }
    };

    uploadFrame = () => {
    
      if(this.state.visibilityUpload)
      {
        return(
          <div className="uploadSection centerElement">

            <h1 className="centerElement">Select your log file</h1>
            <input className="fileLoad" type="file" onChange={this.onFileChange} />
            <button className={'fileButton ' + this.state.visibilityButton} onClick={this.onFileUpload}>Upload</button>

          </div>
        )
      }

    };

    loadingFrame = () => {
      if(this.state.visibilityloading)
      {
        return (
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
      }
      else
      {
        console.log("Not Loading files");
      }
    }

    cleanState = () => {
      this.state.visibilityUpload = "Show";
      this.state.selectedFile = null;
      this.state.visibilityloading = null;
      this.state.resultTable = null;
      this.state.visibilityButton = 'hide';
      this.forceUpdate();
    };

    resultTable = () => {
      if(this.state.resultTable)
      {
        return (

          <div>
            <table>
              <tbody>
                <tr>
                  <th>Driver Name</th>
                  <th>Miles Driven</th>
                  <th>Miles Per Hour</th>
                </tr>
                {this.state.resultTable.map((driver) =>
                  <tr>
                    <td>{driver.Name}</td>
                    <td>{driver.MilesDriven}</td>
                    <td>{driver.MilesPerHour}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <button className="returnButton" onClick={this.cleanState}>Return to Upload</button>
          </div>

        )
      }
    }
    
    render() {
    
      return (
        <div className="mainContainer">

          {this.uploadFrame()}

          {this.fileData()}

          {this.resultTable()}

          {this.loadingFrame()}

        </div>
      );
    }
}
 
export default App;