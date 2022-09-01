import React, {Fragment, useState, useEffect} from 'react';
import {Text, TextInput, View, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './style';
import {Button} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserData} from '../../store/actions';
import {IUserState} from '../../store/reducers/auth';
import {showToast} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILoginScreen {}

function Index(props: ILoginScreen) {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<any>([]);
  const dispatch = useDispatch();
  const userData: IUserState = useSelector(state => state?.auth);

  useEffect(() => {
    checkTodos();
  }, []);

  const checkTodos = async () => {
    const myTodos = await AsyncStorage.getItem('myTodos');
    if (myTodos) {
      setTodos(JSON.parse(myTodos));
    }
  };
  const handleLogout = () => {
    dispatch(clearUserData());
  };

  const handleAddTodo = () => {
    if (todo.length > 4) {
      const todoDto: any = {
        name: todo.trim(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log('todo', todoDto);
      setTodos([...todos, todoDto]);
      setTodo('');
      AsyncStorage.setItem('myTodos', JSON.stringify([...todos, todoDto]));
      return 0;
    } else {
      showToast({
        type: 'error',
        text: 'Todo must be greater than 3 characters',
      });
      return 0;
    }
  };

  const markAsDone = (index: number) => {
    let allTodos = [...todos];
    allTodos[index] = {
      ...todos[index],
      completed: true,
    };
    setTodos([...allTodos]);
    AsyncStorage.setItem('myTodos', JSON.stringify([...allTodos]));
  };

  return (
    <Fragment>
      <View style={styles.headerRow}>
        <Text numberOfLines={1} style={styles.heading}>
          Welcome, {userData.fullname}
        </Text>
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.5}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={todo}
        maxLength={32}
        onChangeText={setTodo}
        style={styles.input}></TextInput>
      <Button buttonStyle={styles.addBtn} onPress={handleAddTodo}>
        Add
      </Button>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.todo}>
            <Text
              style={{
                ...styles.todoText,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}>{`${index + 1})  ${item.name}`}</Text>
            {!item.completed && (
              <TouchableOpacity
                onPress={() => markAsDone(index)}
                activeOpacity={0.5}>
                <Text>Mark Done</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </Fragment>
  );
}

export default Index;
