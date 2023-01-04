import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, Image, View, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);

      const req = await fetch("https://api.b7web.com.br/cinema/");
      const json = await req.json();

      if (json) {
        setMovies(json);
      }
      // tá puxando os filmes

      setLoading(false);
    }

    requestMovies();
  }, []);

  return (
    <>
    {/* <View style={styles.header}></View> */}
    
    <SafeAreaView style={styles.container}>
      

      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size='large' color='#fff' />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }

      {!loading &&
        <>
          <Text style={styles.totalMoviesTxt}>Total de filmes: {movies.length}</Text>

          <FlatList style={styles.list}
            data={movies}
            renderItem={({ item }) => (
              <View styles={styles.movieItem}>

                <Image
                  source={{ uri: item.avatar }}
                  style={styles.movieImage}
                  resizeMode={"contain"} />
                <Text style={styles.movieTitle}>{item.titulo}</Text>

              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#333',
  },

  movieImage: {
    height: 400,
    // marginTop: 20

  },

  totalMoviesTxt: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
  },

  list: {
    flex: 1,
  },

  movieItem: {
    marginBottom: 30,
  },

  movieTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 30
  },

  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },

  //header
  header: {
    backgroundColor: '#B21C23',
    height: 140,
    width: '100%'
  }

  
});
