import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [personaReserva, setPersonaReserva] = useState('');
  const [alumno, setAlumnos] = useState([]);
  const [carnet, setCarnet] = useState('');
  const [colorFav, setColorfav] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFechaReserva(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarAlumno = () => {
    const nuevoAlumno = { id: alumno.length + 1, nombre: nombre, carnet: carnet, colorFav: colorFav, fechaReserva: fechaReserva, persoReserva: personaReserva };
    setAlumnos([...alumno, nuevoAlumno]);
    setNombre('');
    setCarnet('');
    setColorfav('');
    setFechaReserva(new Date());
    setPersonaReserva('');
    setModalVisible(false);
  };

  const eliminarAlumno = (id) => {
    setAlumnos(alumno.filter((alumno) => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Alumno" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              keyboardType='numeric'
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia favorita"
              value={colorFav}
              onChangeText={setColorfav}
            />
            <TouchableOpacity onPress={showDatepicker}><Text style={styles.datePickerText}>Seleccionar fecha de nacimiento</Text></TouchableOpacity>
            <Text style={styles.selectedDateText}>Seleccionada: {fechaReserva.toLocaleString()}</Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES'
              />
            )}
            <View style={styles.buttonContainer}>
              <Button title="Agregar Alumno" onPress={agregarAlumno} />
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={alumno}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.clienteItem}
          >
            <View style={styles.conte}>
              <Text style={styles.clienteNombre}>{item.id}</Text>
              <TouchableOpacity
                style={styles.buttonEliminar}
                onPress={() => eliminarAlumno(item.id)}>
                <Text style={styles.clienteNombre}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.clienteNombre}>{item.nombre}</Text>
            <Text style={styles.clienteNombre}>{item.carnet}</Text>
            <Text style={styles.clienteNombre}>{item.colorFav}</Text>
            <Text style={styles.clienteFecha}>
              Fecha de nacimiento: {item.fechaReserva.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f9f9', // Fondo blanco tipo gris suave
    padding: 36,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20, // Input redondeado
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
  conte: {
    flexDirection: 'row',
  },
  buttonEliminar: {
    marginLeft: 300,
  },
  buttonContainer: {
    marginTop: 10,
  },
  datePickerText: {
    color: 'blue', // Cambio de color a azul como un link
    marginBottom: 10,
  },
  selectedDateText: {
    marginBottom: 10,
  },
});

export default App;
