import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    //Header bar
    profileBtn: {
        marginLeft: 20,
    },
    msgBtn: {
        marginRight: 20,
    },
    headerImg: {
        width: 20,
        height: 20
    },

    //Tab Bar
    tabContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    tabNav: {
        flexDirection: "column",
        alignItems: "center"
    },
    tabImage: {
        width: 25,
        height: 25
    },
    tabTitle: {
        fontSize: 10
    },

    //reuseable
    container: {
        flex: 1,
        flexDirection: "column",
    },
    fluid: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    containerContent: {
        paddingLeft: 10,
        paddingRight: 10 
    },
    titlesCont: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
    },
    titles: {
        fontSize: 20,
        color: '#708090',
    },

    //login Page
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems: "center" 
    },
    logo: {
      fontFamily: 'Nova-Round',
      fontSize: 50,
      color: 'white',
      backgroundColor: 'red',
      borderRadius: 10,
      padding: 5,
    },
    alertLogin: {
        marginTop: 50,
        color: "rgba(240,52,52,0.7)",   
        fontStyle: "italic"
    },
    emailLabel: {
      marginTop: 5,
      color: '#C0C0C0'
    },    
    emailInput: {
      height: 30,
      width: 200,
      borderBottomWidth: 2
    },
    passwordLabel: {
      marginTop: 20,
      color: '#C0C0C0'
    },
    passwordInput: {
      height: 30,
      width: 200,
      borderBottomWidth: 2,
      textAlign: "center"
    },
    button: {
      marginTop: 50,
      width: 80,
      height: 35,
      backgroundColor: 'red',
      alignItems: "center",
      borderRadius: 5
    },
    loginBtn: {
      textAlign: "center",
      fontSize: 20,
      color: "white"
    },
    textMargin: {
      marginTop: 10,
      color: '#C0C0C0'
    },
    auth: {
      flexDirection: "row",
      marginTop: 20,
    },
    facebook: {
      width: 20,
      height: 20,
      marginRight: 5
    },
    google: {
      marginLeft: 5,
      width: 20,
      height: 20
    },

    //register Page
    register: {
      marginTop: 20,
      color: '#c0c0c0'
    },
    registerBtn: {
      textAlign: "center",
      color: '#c0c0c0'
    },
    title: {
        fontSize: 24,
        color: '#2f4f4f',
        backgroundColor: 'whitesmoke',
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    registerLabel: {
        marginTop: 20,
    },
    registerAlert: {
        fontSize: 10,
        color: 'rgba(241,52,52,0.8)',
        fontStyle: "italic"
    },
    registerInput: {
        width: '100%',
        borderBottomWidth: 1,
    },
    dateInput: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottomWidth: 1,
    },
    dateTxt: {
        marginBottom: 4,
    },  
    dateBtn: {
        position: "absolute",
        width: "100%",
    },
    dateImg: {
        marginTop: 10,
        width: 20,
        marginBottom: 8,
        left: 320,
        height: 20,
    },
    registerSubmit: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        width: 120,
        backgroundColor: "red",
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    registerButtonTitle: {
        color: "white",
        fontSize: 18
    },
    
    //Home Page
    addRequest: {
        color: 'blue'
    },
    statusBox: {
        backgroundColor: 'whitesmoke',
        width: "90%",
        minHeight: 100,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20,
        flexDirection: "row",
        marginBottom: 10
    },
    profilePictureFluid: {
        flexDirection: "column",
        alignItems: "center",
        width: "25%",
    },
    statusImage: {
        marginTop: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    statusContent: {
        flexDirection: "column",
        width: "75%",
        marginTop: 10,
        paddingRight: 10
    },
    statusTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
        marginBottom: 5
    },  
    statusName: {
        fontWeight: "bold",
    },
    deadlineStatus: {
        fontSize: 10,
        fontStyle: "italic"
    },
    requestStatus: {
        fontSize: 10
    },
    statusDescription: {
        fontSize: 10,
        fontStyle: "italic"
    },
    btnPosition: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10
    },
    btnStatus: {
        backgroundColor: "red",
        width: 50,
        padding: 3,
        borderRadius: 5
    },
    contactReqBtn: {
        textAlign: "center",
        fontSize: 10,
        color: "whitesmoke"
    },
    //Add Request Page
    textarea: {
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5
    },

    //message Page
    messageCard: {
        flexDirection: 'row',
        marginTop: 10,
        width: "100%",
        height: 70,
    },
    messagePhoto: {
        width: "20%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    messageProfile: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    messageContent: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
    },
    messageName: {
        fontWeight: "bold",
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1, 
    },
    messageValue: {
        fontSize: 12,
        marginTop: 10
    },
    //Event Page
    eventTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    eventPoster: {
        marginTop: 20,
        width: 300,
        height: 300,
    },
    eventBtn: {
        marginTop: 40,
        width: 125,
        padding: 5, 
        backgroundColor: "red",
        borderRadius: 5,
    },
    seeLocationText : {
        textAlign: "center",
        color: "whitesmoke",
    },
    carouselItem: {
        backgroundColor:'whitesmoke',
        borderRadius: 5,
        height: 500,
        padding: 20,
        flexDirection: "column",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20,
    },
    containerCarousel: {
        flexDirection:'column', 
        justifyContent: 'center', 
        alignItems: "center"
    },
    //search page
    searchForm: {
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingBottom: 5,
        paddingTop: 5,
    },
    searchCard: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: "95%",
        height: 50,
        backgroundColor: "whitesmoke",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 20,
        borderRadius: 5
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    available: {
        color: "green"
    },
    requestSearchBtn: {
        backgroundColor: "red",
        width: 70,
        borderRadius: 5,
    },
    requestSearchTextBtn: {
        color: "whitesmoke",
        textAlign: "center"
    }
})