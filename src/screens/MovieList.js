
import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useGetPopularMoviesQuery, useGetLatestMoviesQuery } from '../store/apis/api';
import { useNavigation } from '@react-navigation/native';

const MovieListScreen = () => {
    const { data: popularMovies, isError, isLoading } = useGetPopularMoviesQuery();
    const { data: latestMovies } = useGetLatestMoviesQuery();
    const navigation = useNavigation();

    const renderMovieItem = ({ item }) => (

        <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', { movieId: item?.id })}>
            <View style={{ margin: 10 }}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                    style={{ width: 150, height: 200 }}
                />
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    // right: 0,
                    marginBottom: 30,
                    marginLeft: 10,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.voteCountText}>
                        {item?.vote_count}
                    </Text>

                </View>
                <Text style={styles.movieText}>{item.title}</Text>
                <Text style={styles.date}>{item.release_date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <Text style={styles.text}>Popular Movies</Text>
            <FlatList
                horizontal
                data={popularMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
            />
            <Text style={styles.text}>Latest Movies</Text>
            <FlatList
                horizontal
                data={latestMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderMovieItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    voteCountText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    movieText: {
        marginTop: 10,
        color: "black",
        fontWeight: "bold",
        fontSize: 15
    },
    date: {
        fontSize: 14
    }
})
export default MovieListScreen;
