import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';

import axios from 'axios';
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from "../../components/Admin";
import { useRegistro } from "../../hooks/useRegistro";
import { RegistroTablesAdmin } from "../../components/Admin";
import { Container, Pagination } from "semantic-ui-react";

export function RegistrosAdmin() {

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000//api/registro/?page=${page}&page_size=10`
        );
        if(response.data!==null){
          setData(response.data);

        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);
  if(data!==null){
    
    console.log("Resultado:asd",data);
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    (data!==null)?(

    <View style={styles.container}>
      {data.results.map(post => (
        <View key={post.cop} style={styles.postContainer}>
          <Text style={styles.title}>{post.cop}</Text>
          <Text style={styles.body}>{post.apellido_paterno}</Text>
          <Text style={styles.body}>{post.apellido_paterno}</Text>
          <Text style={styles.body}>{post.apellido_paterno}</Text>
          <Text style={styles.body}>{post.apellido_paterno}</Text>
        </View>
      ))}
      <View style={styles.paginationContainer}>
        <Button
          title="Previous"
          disabled={page === 1}
          onPress={() => setPage(page - 1)}
        />
        <Text style={styles.page}>{page}</Text>
        <Button
          title="Next"
          onPress={() => setPage(page + 1)}
        />
      </View>
    </View>
    ):""
  );
}


//<RegistroTablesAdmin registros={registros} />
/*<HeaderPage
title="Registros"
btnTitle="Crear Registro de Colegiado"
btnClick={console.log("click crear")}
/>*/
