import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from "react-native";
import { DataTable } from 'react-native-paper';
import { getMovies } from './fakeMovieService';
import applicationAPI from '../resources/applicationAPI';
import axios from 'axios';

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingTop: 10,
        minHeight: 100,
    },
})
export default class MiddleView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies : ''
           }
        }
        _getData = async () =>{

            try {
                var dataObj=[];
                const response = await axios.get(applicationAPI.getToDo, null);
                console.log(response, "cdd")
                if (response.data) {
                    if (response.data.resultData.length > 0) {
                        for (var i = 0; i < response.data.resultData.length; i++) {
                            dataObj.push({
                                id: response.data.resultData[i].id,
                                task_Name: response.data.resultData[i].task_name,
                            })
                        }
    
                        console.log( "TODOS", dataObj);
                        this.props.dispatch({type: "ADD_TODOS", payload:dataObj})
                    }
                }
                else{
                    console.log("response failed");
                }
              } catch (error) {
                console.log(error, "ser");
              } finally { /*this.setState({ loading: false }); */
              }
          }
        componentDidMount  = async () => {
            this._getData()
     
           }
    render() {
        return (
            <View  style={styles.header}>
                <DataTable >
                    <DataTable.Header>
                        <DataTable.Title style={{alignItems: 'center'}}>Title</DataTable.Title>
                    </DataTable.Header>

                    { this.props.todos?.todos?.length &&  this.props.todos?.todos?.map(movie => (
                    <DataTable.Row  key={movie.id}>
                        <DataTable.Cell>{movie.task_Name}</DataTable.Cell>
                    </DataTable.Row>
                       ))} 
                    <DataTable.Pagination
                        page={1}
                        numberOfPages={3}
                        onPageChange={page => {
                            console.log(page);
                        }}
                        label="1-2 of 6"
                    />
                </DataTable>
            </View>
        );
    }
}