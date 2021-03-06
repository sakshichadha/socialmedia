const e=require('express');
const connectDB=require('./config/db');
const app=e();
app.use(e.json({extended:false}));
console.log("BEFORE");
connectDB();
console.log("After");
// app.get('/',(req,res)=>
// {
// res.send('API RUNNING');
// })
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

const port=8000;
app.listen(port,()=>console.log('Server has started'));