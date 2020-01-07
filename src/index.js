import React, { Component } from 'react'
import { Text, View , StyleSheet, FlatList, Dimensions, TouchableOpacity} from 'react-native'
const {height: HEIGHT, width: WIDTH} = Dimensions.get('window')

const DUMMY_LIST_DATA = [
    {
        id: 'Enjoy',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
    },
    {
        id: 'Designed',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
    },
    {
        id: 'Corporate',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
    },
    {
        id: 'Spicexpress',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
    },
    {
        id: 'Apply',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
    },
    {
        id: 'Change',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain'
    }
];

const DOT_COLOR = '#f7941d';

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginTop: 32 },
    row: { marginBottom: 30, flexDirection: 'row' },
    leftContainer: { flexDirection: 'row' },
    image: { height: 45, width: 52 },
    titleText: { fontWeight: '600', fontSize: 20, color: '#222222', marginLeft: 16 },
    rightContainer: { marginLeft: 50, flex: 1, height: 100 },
    indicator: { width: '100%', flexDirection: 'row' },
    indicatorText: { fontWeight: '600', color: '#111111', marginHorizontal: 4 },
    dotsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    dots: { width: 6, height: 6, borderRadius: 3, borderWidth: 1, marginHorizontal: 10 },
    listContainer: { flex: 1, height: 60 },
    rowContainer: { justifyContent: 'flex-start', alignItems: 'flex-start' }
});


export default class HorizontalCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props && props.containerWidth ? props.containerWidth : WIDTH,
            currentIndex: 0
        };
    }

    scrollToIndex = () => this.flatList_Ref.scrollToIndex({ animated: true, index: this.state.currentIndex });

    onLayout = (e) => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    }

    decreaseCount = () => {
        this.setState((prevState) => {
            const currentIndex = prevState.currentIndex === 0 ? 0 : (prevState.currentIndex - 1);
            return { currentIndex };
        }, () => this.scrollToIndex());
    }

    increaseCount = () => {
        this.setState((prevState) => {
            const currentIndex = prevState.currentIndex === (DUMMY_LIST_DATA.length - 1)
                ? (DUMMY_LIST_DATA.length - 1) : (prevState.currentIndex + 1);
            return { currentIndex };
        }, () => this.scrollToIndex());
    }

    row = (item, index) => (
        <Text style = {{ width }} numberOfLines = {4}>
            {item.description}
        </Text>
    )

    renderRow = (index, item) => {
        const { width } = this.state;
        const { renderRow } = this.props;
        return (
            <View style = {[styles.rowContainer, { width }]} onLayout = {this.onLayout}>
                {renderRow ? renderRow(index, item) : this.row(item, index)}
            </View>
        );
    }
    renderPageIndicator = () => {
        const { currentIndex } = this.state;
        const { dotColor, forwardText, backwardText } = this.props;
        return (
            <View style = {styles.indicator}>
                <TouchableOpacity onPress = {() => this.decreaseCount()}>
                    <Text style = {[styles.indicatorText, currentIndex === 0 ? { color: '#aaaaaa' } : {}]}>
                        { backwardText ? backwardText : 'PREV' }
                    </Text>
                </TouchableOpacity>
                <View style = {styles.dotsContainer}>
                    {
                        DUMMY_LIST_DATA.map((item, index) => {
                            const selected = { backgroundColor: dotColor ? dotColor : DOT_COLOR };
                            return (
                                <View key = {index} style = {[styles.dots, { borderColor: dotColor ? dotColor : DOT_COLOR } , (index === currentIndex) ? selected : {}]} />
                            );
                        })
                    }
                </View>
                <TouchableOpacity onPress = {() => this.increaseCount()}>
                    <Text style = {[styles.indicatorText, currentIndex === DUMMY_LIST_DATA.length - 1 ? { color: '#aaaaaa' } : {}]}>
                        { forwardText ? forwardText : 'NEXT' }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { width } = this.state;
        const { data }=  this.props;

        return (
            <View>
                <FlatList
                    data = {data ? data : DUMMY_LIST_DATA}
                    horizontal
                    // eslint-disable-next-line no-return-assign
                    ref = {ref => this.flatList_Ref = ref}
                    showHorizontalScrollIndicator
                    getItemLayout = {(data, index) => (
                        { length: width, offset: width * index, index }
                    )}
                    renderItem = {({ item, index }) => this.renderRow(index, item)}
                    keyExtractor = {item => item.id}
                />
                {this.renderPageIndicator()}
            </View>
        )
    }
}
