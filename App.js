/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{ useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HeaderView from './components/HeaderView';
import MiddleView from './components/MiddleView';
import axios from 'axios';
import applicationAPI from './resources/applicationAPI';
import { connect } from 'react-redux';

const App: (props) => React$Node = () => {
  useEffect(()=>{
    getData();
  },[])
  const getData = async () =>{
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
              props.dispatch({type: "ADD_TODOS", payload:dataObj})
          }
        //  console.log(this.state.movies, "cdd")
          // this.setState({
          //     movies: dataObj,
          //     loading: false
          // });
      }
      else{
          console.log("response failed");
      }
    } catch (error) {
      console.log(error, "ser");
    } finally { /*this.setState({ loading: false }); */
    }
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <HeaderView getData = {getData}/>
          {/* {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )} */}
          <View style={styles.body}>
            <MiddleView/>
            {/* <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View> */}
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
const mapStateToProps = state =>{
  return {
     todos: state.todos.todos
  }
}
export default connect(mapStateToProps) (App);
