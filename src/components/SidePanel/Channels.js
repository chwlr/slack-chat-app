import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetail: "",
    channelRef: firebase.database().ref("channels"),
    modal: false
  };

  handeSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  isFormValid = ({ channelName, channelDetail }) =>
    channelName && channelDetail;

  addChannel = () => {
    const { channelRef, channelName, channelDetail, user } = this.state;
    const key = channelRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetail,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    };

    channelRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetail: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  closeModal = () => this.setState({ modal: false });
  openModal = () => this.setState({ modal: true });

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> Channels
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* Channels */}
        </Menu.Menu>
        {/* modal component */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handeSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="Channel Details"
                  name="channelDetail"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handeSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
