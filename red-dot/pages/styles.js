import { SplashScreen } from 'expo';
// import {  } from 'expo-status-bar';
import { Dimensions, StyleSheet, StatusBar, Platform } from 'react-native';
import { color } from 'react-native-reanimated';
const { width: screenWidth } = Dimensions.get('window');

export const COLORS = {
  primary: '#900d0d',
  secondary: '#cf1b1b',
  darkAlt: '#423144',
  lightAlt: '#ffdbc5',
  white: 'white',
  lightPrimary: '#eeeeee',
  darkSecondary: '#393e46',
  darkPrimary: '#222831',
  muted: '#C0C0C0',
};

const mlt = 8;

export const SIZE = (idx) => idx * mlt;
export const SPACE = (idx) => (idx * mlt) / 2;

export const styles = StyleSheet.create({
  screenWidth,
  //Header bar
  profileBtn: {
    marginLeft: 20,
  },
  msgBtn: {
    marginRight: 20,
  },
  headerImg: {
    width: 20,
    height: 20,
  },

  //Tab Bar
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabNav: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabImage: {
    width: 25,
    height: 25,
  },
  tabTitle: {
    fontSize: 10,
  },

  //navigation
  headerTitle: {
    
  },
  header: {
    backgroundColor: COLORS.lightPrimary,
  },

  //reuseable
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.lightPrimary,
    fontFamily: 'Nova-Round',
  },
  containerCenter: {
    flex: 1,
    fontFamily: 'Nova-Round',
    backgroundColor: COLORS.lightPrimary,
    // flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  containerContent: {
    paddingHorizontal: SPACE(3),
    paddingVertical: SPACE(3),
    alignItems: 'center',
  },
  row: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  fluid: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  titlesCont: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  titles: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    color: '#708090',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },

  //welcome page
  wpBg: {
    paddingHorizontal: 20,
  },

  //login Page
  background: {
    flex: 0.8,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily: 'Nova-Round',
  },
  logo: {
    maxHeight: screenWidth / 8,
    resizeMode: 'contain',
    flexWrap: 'wrap',
    marginBottom: 'auto',
  },
  alertLogin: {
    marginTop: 50,
    color: 'rgba(240,52,52,0.7)',
    fontStyle: 'italic',
  },
  textPrimary: {
    color: COLORS.primary,
  },
  textMuted: {
    color: COLORS.muted,
    fontSize: SIZE(1.8),
    textAlign: 'center',
  },
  textWhite: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SIZE(2),
  },
  textDarkSecondary: {
    color: COLORS.darkSecondary,
  },
  // reuse
  textInput: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACE(2),
    paddingHorizontal: SPACE(4),
    // borderRadius: SPACE(10),
    width: screenWidth / 1.5,
    marginVertical: SPACE(1),
    marginHorizontal: SPACE(1),
    // textAlign: 'center',
    fontSize: SIZE(2),
    color: COLORS.primary,
  },
  textInputAlert: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACE(2),
    paddingHorizontal: SPACE(4),
    borderRadius: SPACE(10),
    width: screenWidth / 1.5,
    marginVertical: SPACE(1),
    marginHorizontal: SPACE(1),
    // textAlign: 'center',
    fontSize: SIZE(2),
    color: COLORS.primary,
    borderColor: COLORS.lightAlt,
    borderWidth: 3,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACE(2),
    paddingHorizontal: SPACE(4),
    borderRadius: SPACE(10),
    width: screenWidth / 1.5,
    marginVertical: SPACE(1),
    marginHorizontal: SPACE(1),
    textAlign:'center'
  },
  buttonPrimaryOutline: {
    // backgroundColor: COLORS.primary,
    paddingVertical: SPACE(2),
    paddingHorizontal: SPACE(4),
    borderRadius: SPACE(10),
    width: screenWidth / 1.5,
    marginVertical: SPACE(1),
    marginHorizontal: SPACE(1),
    borderWidth: 1,
    borderColor: COLORS.primary,
    color: COLORS.primary,
    textAlign: 'center',

    //LOGIN
  },
  buttonRegister: {
    color: COLORS.primary,
    fontSize: SIZE(2.5),
    borderBottomWidth: 1,
    paddingBottom: SPACE(1),
    borderBottomColor: COLORS.muted,
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth / 4,
    marginVertical: SPACE(2),
  },
  socialButtonContainer: {
    height: screenWidth / 10,
    width: screenWidth / 10,
  },
  socialButton: {
    width: '100%',
    height: '100%',
  },
  pLogin: {
    color: COLORS.muted,
    fontSize: SIZE(2),
    marginVertical: SPACE(2),
  },

  //REGISTER

  dateBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  dateImg: {
    width: 20,
    marginBottom: 8,
    height: 20,
  },


  //----
  //----
  //----
  // emailLabel: {
  //   marginTop: 5,
  //   color: '#C0C0C0',
  // },
  // emailInput: {
  //   height: 30,
  //   width: 200,
  //   // borderBottomWidth: 2,
  // },
  // passwordLabel: {
  //   marginTop: 20,
  //   color: '#C0C0C0',
  // },
  // passwordInput: {
  //   height: 30,
  //   width: 200,
  //   borderBottomWidth: 2,
  //   textAlign: 'center',
  // },
  // button: {
  //   marginTop: 50,
  //   width: 80,
  //   height: 35,
  //   backgroundColor: 'red',
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
  // loginBtn: {
  //   textAlign: 'center',
  //   fontSize: 20,
  //   color: 'white',
  // },
  // textMargin: {
  //   marginTop: 10,
  //   color: '#C0C0C0',
  // },
  // auth: {
  //   flexDirection: 'row',
  //   marginTop: 20,
  // },
  // facebook: {
  //   width: 20,
  //   height: 20,
  //   marginRight: 5,
  // },
  // google: {
  //   marginLeft: 5,
  //   width: 20,
  //   height: 20,
  // },

  // //register Page
  // register: {
  //   marginTop: 20,
  //   color: '#c0c0c0',
  // },
  // registerBtn: {
  //   textAlign: 'center',
  //   color: '#c0c0c0',
  // },
  // title: {
  //   fontSize: 24,
  //   color: '#2f4f4f',
  //   backgroundColor: 'whitesmoke',
  //   paddingTop: 10,
  //   paddingBottom: 5,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#dcdcdc',
  // },
  // registerLabel: {
  //   marginTop: 10,
  // },
  // registerAlert: {
  //   fontSize: 10,
  //   color: 'rgba(241,52,52,0.8)',
  //   fontStyle: 'italic',
  // },
  registerInput: {
    width: '100%',
    borderBottomWidth: 1,
    fontFamily: 'Ubuntu-Regular'
  },
  // dateInput: {
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  //   borderBottomWidth: 1,
  // },
  // dateTxt: {
  //   marginBottom: 0,
  // },
  // dateBtn: {
  //   position: 'absolute',
  //   width: '100%',
  // },
  // dateImg: {
  //   marginTop: 10,
  //   width: 20,
  //   marginBottom: 8,
  //   left: 320,
  //   height: 20,
  // },
  // registerSubmit: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 30,
  //   width: 120,
  //   backgroundColor: 'red',
  //   borderRadius: 5,
  // },
  // buttonContainer: {
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  // registerButtonTitle: {
  //   color: 'white',
  //   fontSize: 18,
  // },



  //Home Page
  addRequest: {
    color: 'blue',
  },
  statusBox1: {
    backgroundColor: 'white',
    width: '96%',
    minHeight: 100,
    // borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // elevation: 20,
    flexDirection: 'row',
    // borderBottomColor: 'rgba(0,0,0,0.2)',
    // borderBottomWidth: 1,
    // marginBottom: 5,
  },
  statusBox2: {
    backgroundColor: "white",
    width: '96%',
    minHeight: 100,
    flexDirection: 'row',
  },
  profilePictureFluid: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
  },
  dotBox: {
    // backgroundColor: "black",
    width: '100%',
    // minHeight: 50
  },
  photoBot: {
    marginTop: SPACE(2),
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: "70%",
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 40,
  },
  borderDot: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    marginTop: SPACE(2.5),
    width: "50%",
    minHeight: "100%",
    borderStyle: "dashed",
    borderRightColor: 'rgba(0,0,0,0.08)',
    borderRightWidth: 1,
    borderRadius: 1,
  },
  statusImage: {
    marginVertical: 5,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  statusContent: {
    flexDirection: 'column',
    width: '75%',
    marginTop: 10,
    paddingRight: 10,
  },
  statusTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: 'rgba(0,0,0,0.2)',
    // borderBottomWidth: 1,
    marginBottom: 5,
  },
  statusName: {
    // fontWeight: 'bold',
    fontFamily: "Ubuntu-Bold"
  },
  deadlineStatus: {
    fontSize: 10,
    fontFamily: 'Ubuntu-LightItalic',
  },
  requestStatus: {
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular'
  },
  statusDescription: {
    marginTop: SPACE(2),
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    // fontStyle: 'italic',
  },
  btnPosition: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  btnStatus: {
    marginTop: SPACE(5),
    backgroundColor: COLORS.primary,
    width: 50,
    padding: 3,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
        width: 3,
        height: 2
    },
    shadowOpacity: 0.9,
    shadowRadius: 50,
    elevation: 6,
  },
  contactReqBtn: {
    textAlign: 'center',
    fontSize: 10,
    color: 'whitesmoke',
  },
  //Add Request Page
  textarea: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  //message Page
  messageCard: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    height: 70,
  },
  messagePhoto: {
    width: '20%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageProfile: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  messageContent: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
  },
  messageName: {
    fontWeight: 'bold',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  messageValue: {
    fontSize: 12,
    marginTop: 10,
  },
  //Event Page
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventNotes: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },

    titleChat: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: "center",
        paddingBottom: 5,
        paddingTop: 5,
    },
    photoChat: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 50
    },
    titleTextChat: {
      fontFamily: "Ubuntu-Medium",
      fontSize: 18
    },

  eventPoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  eventBtn: {
    padding: 8,
    marginTop: 5,
    backgroundColor: 'red',
    borderRadius: 5,
    width: '50%',
  },
  seeLocationText: {
    textAlign: 'center',
    color: 'whitesmoke',
  },
  carouselItem: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    width: screenWidth - 100,
    height: screenWidth * 1.33 - 100,
    // flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 7,
    // },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  containerCarousel: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:'blue',
    // flex:1
  },
  //   cardFooter: {
  //     justifyContent: 'space-between',
  //     flexDirection: 'row',
  //     width: '100%',
  //   },
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
    width: '95%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fdfdfd',
    borderLeftColor: COLORS.secondary,
    borderLeftWidth: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  available: {
    color: 'green',
    fontFamily: 'Ubuntu-Regular'
  },
  requestSearchBtn: {
    backgroundColor: 'red',
    width: 70,
    borderRadius: 5,
  },
  requestSearchTextBtn: {
    color: 'whitesmoke',
    textAlign: 'center',
  },
  profileDescription: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    height: 500,
    borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50,
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
    borderRadius: 5,
  },
  profilBot: {
    marginVertical: 40,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 180,
    height: 180,
    backgroundColor: "white"
  },
  profil_photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profil_name: {
    fontFamily: "Ubuntu-Medium",
    color: "white",
    fontSize: 20,
  },
  profil_text: {
    fontFamily: "Ubuntu-Medium",
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  editBtnContainer: {
    // marginTop: SPACE(10),
    borderBottomStartRadius: 50,
    backgroundColor: "white",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    paddingRight: SPACE(1)
  },
  editBtn: {
    backgroundColor: "white",
    width: 150,
    paddingVertical: 15,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  editBtnTxt: {
    color: COLORS.primary,
    fontFamily: "Ubuntu-Regular",
    textAlign: "center"
  },
  settingIcon: {
    marginHorizontal: SPACE(2),
    width: 25,
    height: 25
  }
})
