const express=require('express');
const path = require('path');
const body_parser=require("body-parser");
const incidentRouter=require('./routers/incidentrouter');
const evidenceRouter=require('./routers/evidencerouter');
const uploadRouter=require('./routers/uploadrouter');
const searchRouter = require('./routers/searchrouter');
const missedRouter=require('./routers/missedrouter');
const missingsearchRouter=require('./routers/missingsearchrouter');
const gunRouter=require('./routers/gunrouter');
const gunsearchRouter=require('./routers/gunsearchrouter');
const imgRouter=require('./routers/imgrouter');
const evimgRouter=require('./routers/evimgrouter');
const incidentsearchRouter=require('./routers/incidentsearchrouter');
const evidencesearchRouter=require('./routers/evidencesearchrouter');
const adminmapRouter=require('./routers/adminmaprouter');
const patrolRouter=require('./routers/patrolrouter');
const offenderRoutes = require("./routers/offendersrouter");
const offendersearchRouter=require('./routers/offendersearchrouter');
const towerRouter=require('./routers/towerouter');
const towersearchRouter=require('./routers/towersearchrouter');
const theftRouter=require('./routers/theftrouter');
const crimeRouter=require('./routers/crimerouter');
const accidentRouter=require('./routers/accidentrouter');
const multipleimageRouter=require('./routers/multipleimagerouter');
const signupRouter = require('./routers/signuprouter');
const moimageRouter=require('./routers/moimagerouter');
const userLoginRouter = require('./routers/userloginrouter');
const cctvRouter=require('./routers/cctvrouter');
const cctvsearchRouter=require('./routers/cctvsearchrouter');
const tokenverificationRouter=require('./routers/tokenVerificationRouter');
const fetchuserdetailsRouter=require('./routers/fetchuserdetailsrouter');
const authRouter = require('./routers/auth');
const usernameRouter = require('./routers/usernamerouter');
const userLocationRouter = require('./routers/userLocationrouter');
const parkingSlotRouter = require('./routers/parkingslotrouter');
const visitorRouter = require('./routers/visitorimgrouter');
const RobberyRouter=require('./routers/robberyrouter');
const DacoityRouter=require('./routers/dacoityrouter');
const HarassRouter=require('./routers/harassrouter');
const vehicleLocationRouter = require('./routers/vehicleLocationrouter');
const towerPageRouter = require('./routers/towerpagerouter');
const cctvPageRouter = require('./routers/cctvpagerouter');
const fcmtokenRouter = require('./routers/usertokenrouter');
const buzzRouter = require('./routers/buzzrouter');






const app=express();
app.use(body_parser.json());
app.use('/',incidentRouter);
app.use('/',evidenceRouter);
app.use('/',uploadRouter);
app.use('/', searchRouter);
app.use('/', missedRouter);
app.use('/',missingsearchRouter);
app.use('/', gunRouter);
app.use('/',gunsearchRouter);
app.use('/', imgRouter);
app.use('/', evimgRouter);
app.use('/', incidentsearchRouter);
app.use('/', evidencesearchRouter);
app.use('/', adminmapRouter);
app.use('/', patrolRouter);
app.use("/", offenderRoutes);
app.use('/',offendersearchRouter);
app.use('/', towerRouter);
app.use('/', towersearchRouter);
app.use('/', theftRouter);
app.use('/', crimeRouter);
app.use('/', accidentRouter);
app.use('/', RobberyRouter);
app.use('/', DacoityRouter);
app.use('/', HarassRouter);
app.use('/', multipleimageRouter);
app.use('/', moimageRouter);
app.use('/', signupRouter);
app.use('/', userLoginRouter);
app.use('/', cctvRouter);
app.use('/', cctvsearchRouter);
app.use('/', tokenverificationRouter);
app.use('/', fetchuserdetailsRouter);
app.use('/', usernameRouter);
// app.use(authRouter);
app.use('/', authRouter);
app.use('/', userLocationRouter);
app.use('/', vehicleLocationRouter);
app.use('/',parkingSlotRouter);
app.use('/',visitorRouter);
app.use('/',towerPageRouter);
app.use('/',cctvPageRouter);
app.use('/', fcmtokenRouter);
app.use('/', buzzRouter);
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/moimages', express.static(path.join(__dirname, 'moimages')));
app.use('/visitorimg', express.static(path.join(__dirname, 'visitor')));
// app.use('/uploads', express.static(path.join(__dirname, 'D:/FlutterProjects/first_flutter_application/server/uploads')));



module.exports=app;
