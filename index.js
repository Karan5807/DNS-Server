import DNS from "dns2";
import pkg from "dns2"
const { Packet } = pkg;

const Server = DNS.createServer({
  udp: true, // Enable UDP server
  tcp: true, // Enable TCP server
  handle: (request, send, rinfo) => {
    const response = Packet.createResponseFromRequest(request);
    const [question] = request.questions;
    const { name } = question;

    console.log(`Received query for: ${name}`);

    // Example response: Resolve 'example.com' to '192.168.1.1'
    if (name === 'youtube.com') {
      response.answers.push({
        name: name,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 300,
        address: '192.168.1.1'
      });
    } else {
      response.answers.push({
        name: name,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 300,
        address: '127.0.0.1' // Default response
      });
    }

    send(response);
  }
});

// Start the server on port 5333 (You may need root/admin permissions for port 53)
Server.listen({
  // Optionally specify port, address and/or the family of socket() for udp server:
  udp: { 
    port: 5333,
    address: "127.0.0.1",
    type: "udp4",  // IPv4 or IPv6 (Must be either "udp4" or "udp6")
  },
  
  // Optionally specify port and/or address for tcp server:
  tcp: { 
    port: 5333,
    address: "127.0.0.1",
  },
});

console.log('DNS server is running on port 5333');
