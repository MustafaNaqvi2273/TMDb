import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useGetMovieDetailsQuery } from '../store/apis/api';
import { LinearGradient } from 'react-native-linear-gradient';

const MovieDetailScreen = ({ route }) => {
    const { movieId } = route.params;
    const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);

    const renderGenres = () => {
        return movie.genres.map((genre) => genre.name).join(', ');
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError || !movie) {
        return <Text>Error fetching movie details.</Text>;
    }

    return (
        
        <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']} style={styles.container}>
            <View style={styles.imageContainer}>
                {movie ? <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}` }} resizeMode='cover' style={styles.backgroundImage} /> : null}
            </View>
            {/* <ScrollView contentContainerStyle={{flex: 1}}> */}
            <View style={styles.linearGradient}>
                <Text style={styles.title}>{movie?.original_title}</Text>
                <View style={styles.infoSection}>
                    <Text style={styles.info}>{!movie?.adult ? `PG-13` : `PG-18` `${movie.release_date}`} (US) . </Text>
                    <Text style={styles.info}>{renderGenres()} . 2h 22m</Text>
                </View>
                <View style={styles.userScoreSection}>
                    <View style={styles.percentage}>
                        <Text style={styles.info}>
                            {movie?.vote_count}%
                        </Text>
                    </View>
                    <View style={styles.userScore}>
                        <Text style={styles.userScoreText}>User</Text>
                        <Text style={styles.userScoreText}>Score</Text>
                    </View>
                    <Text style={styles.info}>► Play Trailer</Text>
                </View>

                <Text style={{ marginTop: 10, color: "#d3d3d3" }}>Power Corrupts.</Text>
                <Text style={styles.overviewHeading}>Overview</Text>
                <Text style={styles.overview}>{movie.overview}</Text>

                <View style={styles.directorCastInfo}>
                    <View style={styles.writerInfo}>
                        <Text style={styles.directorCastName}>J.J. Abrams</Text>
                        <Text style={styles.directorcast}>Director, Writer</Text>
                    </View>

                    <View style={styles.writerInfo}>
                        <Text style={styles.directorCastName}>Chris Terrio</Text>
                        <Text style={styles.directorcast}>Writer</Text>
                    </View>

                    <View style={styles.writerInfo}>
                        <Text style={styles.directorCastName}>George Lucas</Text>
                        <Text style={styles.directorcast}>Writer</Text>
                    </View>

                </View>
                
            </View>
            {/* </ScrollView> */}
        </LinearGradient>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        // flexDirection: "row",
        backgroundColor: '#fff',
        // margin: 10
        // padding: 10
    },
    userScoreSection: {
        flexDirection: 'row',
        alignItems: "center"
    },
    userScore: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10
    },
    userScoreText: {
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
    },
    overviewHeading: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
        marginTop: 10
    },
    percentage: {
        height: 50,
        width: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#d3d3d3",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 0.4,
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    backgroundImage: {
        // position: 'absolute',
        width: '100%',
        height: '100%',
        top: 2
    },
    linearGradient: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        flex: 0.6,
        flexDirection: "column",
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    info: {
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
        marginTop: 2
    },
    infoDot: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    infoSection: {
        flexDirection: 'row',
        marginBottom: 20,
        width: "90%",
    },
    overview: {
        fontSize: 18,
        color: 'white',
        marginTop: 10,
        width: "95%"
    },
    directorCastInfo: {
        marginTop: 10,
        width: "95%",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    directorCastName: {
        fontSize: 15,
        color: 'white',
        fontWeight: "bold",
        marginBottom: 5,
    },
    directorcast: {
        fontSize: 14,
        color: 'white',
    },
    writerInfo: {
        display: "flex",
        flexDirection: "column"
    }
});

export default MovieDetailScreen;
