const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const requestRoutes = require('./routes/consultancyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();



app.use(bodyParser.json());
app.get('/routes', (req, res) => {
    const routes = [
        { path: '/api/auth', description: 'Authentication endpoints', subpath:  [{ route:  "/" ,  method: post}, { subpath: "/" , method: get}] },
        { path: '/api/profile', description: 'profile endpoints', subpath: [{ route:  "/login" ,  method: post}, { subpath: "/register" , method: post}] },
        { path: '/api/consultancy-requests', description: 'consultancy-requests endpoints' , subpath:  [{ route:  "/" ,  method: post}, { subpath: "/" , method: patch}]  },
        { path: '/api/appointments', description: 'appointments endpoints' , subpath:  [{ route:  "/" ,  method: post}, { subpath: "/" , method: get}] },
        { path: '/api/payments', description: 'payments endpoints' , subpath:  [{ route:  "/" ,  method: post}, { subpath: "/" , method: get}]  },
        { path: '/api/messages', description: 'message endpoints' , subpath:  [{ route:  "/" ,  method: post}, { subpath: "/" , method: get}]  },
        { path: '/api/reports', description: 'reports endpoints' , subpath:  [{ route:  "/" ,  method: post}, { subpath: "/" , method: get}]  },
      ];
    
    return res.json({ routes})
})


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/consultancy-requests', requestRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
