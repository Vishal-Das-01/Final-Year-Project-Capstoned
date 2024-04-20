import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  if(!res.socket.server.io) {

    const io = new Server(res.socket.server, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    //   allowEIO3: true,
    //   cors: {
    //     origin: process.env.NEXT_PUBLIC_SITE_URL,
    //     methods: ['GET', 'POST'],
    //     transports: ['websocket', 'polling'],
    //     credentials: true
    //   }
    })

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // socket.on('send-request', (data) => {
        //     console.log(`Request: ${data}`);

        //     socket.broadcast.emit('receive-request', data);
        // });
  
        socket.on('disconnect', (socket) => {
          console.log(`User disconnected: ${socket.id}`);
        });
    });

    res.socket.server.io = io;
    
    res.end();
  }
}

// export default async function handler(req, res) {
//     if (req.method === 'POST' || req.method === 'GET') {
      
//       if(res.socket.server.io) {
//         console.log('Server is already connected.');
//         res.status(200).end();
//       }

//       const io = new Server(res.socket.server);
//       res.socket.server.io = io;

//       io.on('connection', (socket) => {
//         console.log(`User connected: ${socket.id}`);

//         socket.on('send-message', (data) => {
//             console.log(`Request: ${data.sender}`);

//             socket.broadcast.emit('receive-message', data);
//         });
  
//         socket.on('disconnect', (socket) => {
//           console.log(`User disconnected: ${socket.id}`);
//         });
//       });

//       res.status(200).end();
//     } else {
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }