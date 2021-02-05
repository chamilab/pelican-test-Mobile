import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity
} from "react-native";
import applicationAPI from '../resources/applicationAPI';
import axios from 'axios';

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#F5FCFF',
    },
    header_font: {
        fontSize: 30,
        color: '#0000ff',
        fontSize: 25,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold'
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
    },
    inputContainer: {
        paddingTop: 15,
    },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 10,
        margin: 5
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
});
export default class HeaderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(task_name) {
        this.setState({task_name });
    }
    handleSubmit = async () => {
        const task = this.state.task_name;
        try {
            const response = await axios.post(applicationAPI.saveToDo, {task_name: task});
            console.log(response, 'res')
            if(response.data.success){
                this.props.getData();
                console.log(response, "ss")
                this.setState({
                    task_name: ''
                  })
              }

        } catch (error) {
        } finally { /*this.setState({ loading: false }); */
        }
    }
    render() {
        return (
            <View style={styles.header}>
                <View>
                    <Text style={styles.header_font}>To-do List</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput}
                        placeholder="Task"
                        maxLength={20}
                        onBlur={Keyboard.dismiss}
                        value={this.state.task_name}
                        onChangeText={this.handleNameChange}
                    ></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText} onPress={this.handleSubmit}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
