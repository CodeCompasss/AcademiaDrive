**Prepared by:** Shadil AM  
**LinkedIn:** [Shadil AM – LinkedIn](https://www.linkedin.com/in/shadilam/)  
**Placement Portfolio:** [Placement Portfolio](https://rayyancodingschool.shadilrayyan2.workers.dev/)

**AI Assistance Disclosure:** These learning notes were prepared by Shadil AM with the assistance of ChatGPT.

### Scope of these notes

The uploaded Module 4 material covers:

1. Multimedia networking and streaming.
2. Streaming stored audio and video.
3. RTSP (Real-Time Streaming Protocol).
4. RTP and RTCP.
5. H.323 architecture and operation.
6. SIP (Session Initiation Protocol).
7. SCTP (Stream Control Transmission Protocol).
8. Audio compression.
9. Image compression and JPEG.
10. Video compression and MPEG.

**Important syllabus note:** LZ and LZW text compression are listed in the module outline, but their detailed explanations are not present in the supplied notes. I will identify that gap rather than pretend the supplied material covers it.

The explanations below retain the module's subject coverage while adding the necessary conceptual connections, technical clarifications, diagrams and worked examples. Pasted text

# 1. CORE NOTES — UNDERSTAND THE CONCEPT DEEPLY

## A. Topic Overview: Understand the Big Picture First

### 1. What am I going to study?

Traditional computer networks primarily transfer information such as:

- Text documents.
- Emails.
- Images.
- Files.
- Web pages.

However, modern networks must also transfer information that changes continuously over time.

Examples include:

- Music streaming.
- Online movies.
- Video conferencing.
- Internet telephone calls.
- Live broadcasts.
- Online meetings.

These applications introduce two major challenges:

**Challenge 1: Real-time delivery**

Audio and video should arrive at the correct time. Receiving a video frame several seconds late may make it useless.

**Challenge 2: Large data size**

Audio, images and videos contain enormous amounts of information. Sending them without compression requires substantial bandwidth and storage.

Therefore, Module 4 studies two interconnected areas:

```
              MULTIMEDIA NETWORKING
                       |
             +---------+---------+
             |                   |
             v                   v
      DATA TRANSMISSION       DATA COMPRESSION
             |                   |
             v                   v
      Deliver media         Reduce media size
      efficiently           efficiently
             |                   |
             v                   v
      RTP, RTCP, RTSP       JPEG, MPEG, Audio
      SIP, H.323, SCTP      Compression
             |                   |
             +---------+---------+
                       |
                       v
              Multimedia Services
```

**Central insight:** Multimedia networking determines how media travels through a network, while compression determines how efficiently that media can be represented and transmitted.

### 2. Why does it matter?

Consider watching a 2-hour movie over the Internet.

The system must:

1. Store the movie on a server.
2. Compress the movie to reduce its size.
3. Transmit the compressed data through the network.
4. Deliver the data at an appropriate rate.
5. Reconstruct the video and audio.
6. Maintain synchronization between audio and video.
7. Handle network delays and packet losses.

Without appropriate networking protocols, playback can become interrupted or poorly synchronized.

Without compression, the required bandwidth and storage could become impractical.

This is why multimedia networking and compression work together.

### 3. Main subtopics

|Subtopic|Simple meaning|Why it matters|What you learn to do|
|---|---|---|---|
|Multimedia networking|Transmitting audio and video over networks|Enables multimedia services|Understand media delivery|
|Stored streaming|Playing previously recorded media|Supports on-demand services|Explain streaming architectures|
|RTSP|Controls media playback|Provides playback commands|Understand SETUP, PLAY and TEARDOWN|
|RTP|Carries real-time media packets|Provides timing and sequencing information|Understand RTP headers|
|RTCP|Provides feedback and statistics|Helps monitor media quality|Explain reports|
|H.323|Multimedia communication framework|Connects telephone and Internet systems|Explain architecture|
|SIP|Establishes and terminates multimedia sessions|Enables Internet calling|Explain call establishment|
|SCTP|Reliable message-oriented transport|Supports multiple independent streams|Understand transport features|
|Audio compression|Reduces audio data size|Saves bandwidth|Distinguish compression methods|
|JPEG|Compresses still images|Reduces image storage|Explain JPEG stages|
|MPEG|Compresses video|Reduces video transmission requirements|Explain frame compression|

### 4. How do the concepts connect?

The module follows a logical progression:

```
             MULTIMEDIA APPLICATIONS
                       |
                       v
              Types of Media Services
                       |
                       v
              Streaming Architecture
                       |
             +---------+---------+
             |                   |
             v                   v
        Media Control       Media Transport
             |                   |
             v                   v
            RTSP              RTP / RTCP
                                 |
                  +--------------+--------------+
                  |              |              |
                  v              v              v
                H.323           SIP            SCTP
                  |              |
                  +------+-------+
                         |
                         v
               Real-Time Communication
                         |
                         v
                 COMPRESSION SYSTEMS
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
        Audio          Images          Video
          |              |              |
          v              v              v
      PCM/ADPCM        JPEG           MPEG
      MP3
```

**How to understand this map:**

- Streaming describes how media is delivered.
- RTSP controls media playback.
- RTP transports real-time media.
- RTCP provides information about transmission quality.
- H.323 and SIP support multimedia session establishment and management.
- SCTP provides a reliable transport alternative with multiple streams.
- Compression reduces the amount of data that must be transmitted.

These are related technologies, but they do not all perform the same function.

### 5. One intuitive example

Imagine Alice making a video call to Bob.

```
       ALICE                                  BOB
   +-----------+                         +-----------+
   | Microphone|                         | Speaker   |
   | Camera    |                         | Display   |
   +-----------+                         +-----------+
         |                                     ^
         v                                     |
   +-------------+                       +-------------+
   | Compression |                       | Decompression|
   +-------------+                       +-------------+
         |                                     ^
         v                                     |
   +-------------+       Internet        +-------------+
   | RTP packets | ====================> | RTP packets |
   +-------------+                       +-------------+
         |                                     |
         +---------- RTCP feedback -----------+
```

The process:

1. Alice's microphone captures audio.
2. Her camera captures video.
3. Compression reduces the data size.
4. RTP organizes the real-time media into packets.
5. The packets travel through the Internet.
6. Bob's system reconstructs the audio and video.
7. RTCP can provide feedback about transmission quality.
8. SIP or another session-control system can establish and terminate the call.

This example combines several major concepts in the module.

### 6. Learning outcomes

**Understand**

- Explain multimedia networking.
- Differentiate stored, live and interactive streaming.
- Explain RTP, RTCP, RTSP, SIP, H.323 and SCTP.
- Understand audio, image and video compression.

**Apply**

- Trace a streaming process.
- Interpret RTP header fields.
- Explain SIP call establishment.
- Describe JPEG and MPEG encoding stages.
- Compare compression techniques.

**Reason independently**

- Select an appropriate networking architecture.
- Identify the cause of playback problems.
- Explain compression-quality trade-offs.
- Distinguish media control, transport and session signaling.

### 7. Mental model

Remember this:

**Multimedia networking moves media; protocols organize, control and monitor its delivery; compression reduces the amount of information that must travel.**

---

## B. CORE IDEA — MULTIMEDIA NETWORKING

Multimedia networking is the transmission of audio, video and other time-dependent media through computer networks.

Its fundamental purpose is to deliver multimedia information with acceptable:

- Delay.
- Throughput.
- Quality.
- Synchronization.
- Reliability.

### Three categories of multimedia services

Your notes divide multimedia applications into three categories. Pasted text

#### 1. Streaming stored audio/video

Previously recorded media is stored on a server and delivered when requested.

Examples:

- Movies.
- Recorded lectures.
- Music.
- Television programmes.

```
       Media Server
            |
            | Stored video
            v
         Internet
            |
            v
          Client
            |
            v
       Media Player
            |
            v
         Playback
```

**Important:** The content already exists before the user requests it.

#### 2. Streaming live audio/video

Media is transmitted while an event is happening.

Examples:

- Internet radio.
- Live television.
- Live sports broadcasts.

```
 Live Camera / Microphone
             |
             v
        Live Encoder
             |
             v
          Internet
             |
             v
       Many Receivers
```

**Important:** The content is generated continuously rather than retrieved as a previously completed recording.

#### 3. Interactive audio/video

Two or more participants exchange audio and video interactively.

Examples:

- Internet telephony.
- Video conferencing.
- Online meetings.

```
       User A <==========> User B
          ^                    ^
          |                    |
       Audio +              Audio +
       Video                Video
          |                    |
          +------ Internet ----+
```

Unlike one-way broadcasting, interactive communication requires information to travel in both directions.

### Comparison

|Feature|Stored streaming|Live streaming|Interactive streaming|
|---|---|---|---|
|Content|Previously recorded|Generated live|Generated during interaction|
|Direction|Mainly server to client|Broadcaster to viewers|Two-way|
|Example|Recorded movie|Live radio|Video call|
|User control|Often supports playback control|Usually limited|Participants interact|
|Delay sensitivity|Moderate|High|Very high|

**Examination distinction:** A recorded movie streamed on demand is not the same as a live broadcast, and neither is the same as a two-way video call.

---

## C. PREREQUISITE KNOWLEDGE

Before studying the protocols, understand these networking concepts.

### 1. TCP

Transmission Control Protocol.

TCP provides:

- Reliable delivery.
- Error detection.
- Retransmission.
- Ordered delivery.
- Flow control.

When data is lost, TCP can retransmit it.

This is useful for downloading files, but retransmission can introduce delays.

### 2. UDP

User Datagram Protocol.

UDP provides a lightweight, connectionless transport service.

It does not guarantee:

- Delivery.
- Ordering.
- Retransmission.
- Duplicate elimination.

However, it has lower protocol overhead and avoids TCP's retransmission-based recovery.

This makes UDP useful for delay-sensitive real-time applications.

### 3. IP address and port

An IP address identifies a network interface or host for network communication.

A port identifies an application endpoint within the host.

For example:

```
IP address: 192.168.1.10
Port:       5004

Together:
192.168.1.10:5004
```

### 4. Packetization

Packetization divides a large data stream into smaller units called packets.

```
Original media
+-----------------------------------+
|          Large data stream        |
+-----------------------------------+
                 |
                 v
             Packetization
                 |
       +---------+---------+
       |         |         |
       v         v         v
    Packet 1  Packet 2  Packet 3
```

Packets are transmitted separately and reconstructed by the receiver.

### 5. Compression

Compression reduces the number of bits needed to represent information.

It can reduce:

- Storage requirements.
- Transmission time.
- Network bandwidth requirements.

These prerequisites provide the foundation for the protocols and compression algorithms studied below.

---

## D. VISUAL INTUITION — HOW MULTIMEDIA DATA TRAVELS

The most important distinction in this module is between three different functions.

|Function|Protocol|Main responsibility|
|---|---|---|
|Session control|SIP|Establishes and terminates communication sessions|
|Media playback control|RTSP|Controls streaming operations|
|Media transport|RTP|Carries real-time media information|
|Media feedback|RTCP|Reports transmission statistics and quality|
|Reliable transport|SCTP|Transfers messages reliably using multiple streams|
|Multimedia communication framework|H.323|Coordinates protocols for multimedia communication|

### Understand the complete architecture

```
             MULTIMEDIA APPLICATION
                       |
          +------------+------------+
          |                         |
          v                         v
    Control Information        Media Information
          |                         |
          v                         v
      RTSP / SIP                  RTP
          |                         |
          |                         v
          |                       UDP
          |                         |
          +-------------------------+
                                    |
                                    v
                                    IP
                                    |
                                    v
                                  Network

                  RTCP provides feedback
```

The diagram shows that control information and media information are logically different.

**Why is this important?**

A system may successfully establish a call but still experience poor audio quality.

That means session establishment and media delivery are separate problems.

Similarly, a video player may successfully issue a PLAY command while the actual media transmission experiences packet loss.

---

## E. WHY MULTIMEDIA PROTOCOLS EXIST

Traditional file transfer and multimedia communication have different requirements.

Consider two situations.

**Situation A: Downloading a document**

If one packet is lost, retransmitting it is usually acceptable.

**Situation B: Participating in a live conversation**

If a packet containing speech arrives several seconds late, retransmitting it may be useless because the conversation has already moved forward.

This produces an important trade-off:

```
                NETWORK DELIVERY
                       |
             +---------+---------+
             |                   |
             v                   v
       Reliability           Low Delay
             |                   |
             v                   v
       Retransmission       Avoid waiting
       and ordering         for old packets
```

Neither TCP nor UDP is universally better.

The appropriate choice depends on the application.

For example:

- File downloads generally prioritize reliable delivery.
- Real-time voice often prioritizes timely delivery.
- Interactive applications may combine different transport mechanisms for different data types.

**Important technical clarification:** UDP does not itself guarantee low delay or high quality. It merely avoids TCP's built-in retransmission and ordering mechanisms. Network congestion, packet loss and buffering still affect performance.

## F. HOW MULTIMEDIA STREAMING WORKS

Your notes describe four approaches to streaming stored audio and video. They differ in complexity and in how the media is delivered. Pasted text

### Approach 1: Using a Web Server

The simplest approach uses HTTP to download a media file.

**Architecture**

```
       Client Browser
             |
             | HTTP GET
             v
        Web Server
             |
             | Compressed media file
             v
       Client Browser
             |
             v
        Media Player
             |
             v
          Playback
```

**Working**

1. The browser sends an HTTP GET request.
2. The web server returns the compressed media file.
3. The browser receives the file.
4. A media player plays the downloaded content.

**Advantages**

- Simple architecture.
- Uses existing HTTP infrastructure.
- Easy to implement.

**Limitation**

The browser may need to download substantial portions of the file before playback.

### Approach 2: Web Server with Metafile

A metafile contains information about the actual media file, such as its location or URL.

The server stores two files:

1. Actual audio/video file.
2. Metafile containing information about the media.

**Architecture**

```
           Client Browser
                 |
                 | HTTP GET
                 v
             Web Server
                 |
                 | Metafile
                 v
           Media Player
                 |
                 | URL from metafile
                 v
             Web Server
                 |
                 | Actual media
                 v
             Playback
```

**Working**

1. Browser sends HTTP GET.
2. Web server returns the metafile.
3. Browser passes the metafile to the media player.
4. Media player reads the URL.
5. Media player accesses the actual media file.
6. The server delivers the media.

**Why introduce a metafile?**

It separates the initial browser request from the actual media playback process.

### Approach 3: Using a Media Server

The second approach still uses HTTP for media delivery.

However, the module identifies a limitation: HTTP traditionally runs over TCP, and TCP retransmits lost segments.

For delay-sensitive streaming, retransmission can introduce unwanted delays.

A separate media server can therefore be used.

**Architecture**

```
       Client Browser
             |
             | HTTP GET
             v
         Web Server
             |
             | Metafile
             v
         Media Player
             |
             | Media request
             v
         Media Server
             |
             | UDP-based delivery
             v
          Playback
```

**Working**

1. Browser sends GET to the web server.
2. Web server returns a metafile.
3. Media player reads the URL.
4. Media player contacts the media server.
5. Media server delivers media using a suitable UDP-based protocol.

**Main distinction:** The web server provides the metafile, while the media server delivers the actual media.

### Approach 4: Media Server with RTSP

RTSP adds playback-control functionality.

It supports commands such as:

- SETUP.
- PLAY.
- TEARDOWN.

**Architecture**

```
       Browser
          |
          | HTTP GET
          v
      Web Server
          |
          | Metafile
          v
      Media Player
          |
          | SETUP
          v
      Media Server
          |
          | Response
          v
      Media Player
          |
          | PLAY
          v
      Media Server
          |
          | Media delivery
          v
       Playback
          |
          | TEARDOWN
          v
      Media Server
```

### RTSP commands explained

|Command|Meaning|Purpose|
|---|---|---|
|SETUP|Establishes media delivery parameters|Prepares the streaming session|
|PLAY|Starts playback|Begins media delivery|
|PAUSE|Temporarily suspends playback|Stops playback without necessarily ending the session|
|TEARDOWN|Ends the session|Releases session resources|

PAUSE is an additional standard RTSP operation; the supplied notes emphasize SETUP, PLAY and TEARDOWN.

### Remember the four approaches

|Approach|Server used|Media delivery|
|---|---|---|
|1|Web server|HTTP|
|2|Web server + metafile|HTTP|
|3|Web server + media server|UDP-based media protocol|
|4|Web server + media server + RTSP|RTSP control and separate media transport|

**Examination tip:** Do not confuse RTSP with RTP.

- RTSP controls playback.
- RTP carries real-time media.

---

## G. REAL-TIME TRANSPORT PROTOCOL $RTP$

### 1. Core idea

RTP is a protocol designed to support real-time transmission of audio and video over IP networks.

It operates between the application and UDP.

Its major contributions are:

1. Timestamping.
2. Sequencing.
3. Mixing support.

Pasted text

### 2. RTP architecture

```
+--------------------------+
|    Multimedia Application|
+--------------------------+
             |
             v
+--------------------------+
|           RTP            |
| Timestamp + Sequence     |
| Payload Information      |
+--------------------------+
             |
             v
+--------------------------+
|           UDP            |
+--------------------------+
             |
             v
+--------------------------+
|            IP            |
+--------------------------+
             |
             v
          Network
```

**Important:** RTP is not a replacement for UDP. It operates above UDP and adds real-time media information.

### 3. Why does RTP need timestamps?

Imagine Alice sends three audio packets.

```
Packet 1 --------> 10:00:00
Packet 2 --------> 10:00:20
Packet 3 --------> 10:00:40
```

The timestamps help the receiver understand the media timing.

Without timing information, reconstructing continuous audio and video would be more difficult.

### 4. Why does RTP need sequence numbers?

Suppose packets are transmitted in this order:

```
Sender:
Packet 1 → Packet 2 → Packet 3 → Packet 4

Network:
Packet 1 → Packet 3 → Packet 2 → Packet 4

Receiver:
Packet 1 → Packet 3 → Packet 2 → Packet 4
```

Sequence numbers allow the receiver to recognize that packets have arrived out of order.

They can also help detect missing packets.

**Important distinction:** RTP does not guarantee retransmission or successful delivery. It provides information that applications can use to manage packet loss and ordering.

### 5. RTP packet format

The basic RTP header is 12 bytes, followed by optional CSRC identifiers, an optional extension and the media payload.

```
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-------+-------+-------+---------------------------------------+
 | V | P | X | CC|   M   |          Payload Type                  |
 +-----------------------+---------------------------------------+
 |                     Sequence Number                           |
 +---------------------------------------------------------------+
 |                         Timestamp                             |
 +---------------------------------------------------------------+
 |                   Synchronization Source                       |
 +---------------------------------------------------------------+
 |                 Contributing Sources (Optional)                |
 +---------------------------------------------------------------+
 |                         Media Payload                          |
 +---------------------------------------------------------------+
```

### 6. RTP header fields
![](RTP_packet_header_format.png)

|Field|Size|Function|
|---|--:|---|
|Version (V)|2 bits|Indicates RTP version; current version is 2|
|Padding (P)|1 bit|Indicates padding at the end|
|Extension (X)|1 bit|Indicates an extension header|
|CSRC count (CC)|4 bits|Number of contributing sources|
|Marker (M)|1 bit|Application-defined marker|
|Payload type|7 bits|Identifies payload format|
|Sequence number|16 bits|Numbers RTP packets|
|Timestamp|32 bits|Represents media timing|
|SSRC|32 bits|Identifies synchronization source|
|CSRC|32 bits each|Identifies contributing sources|

These field sizes and functions are described in your module notes. Pasted text

### 7. Important fields explained

**Sequence number**

- First packet begins with a randomly selected value.
- Each subsequent packet increases the sequence number by one.
- The field is 16 bits.

For example:

```
Packet       Sequence number
  1                 1000
  2                 1001
  3                 1002
  4                 1003
```

If packet 1002 is missing, the receiver can identify a gap.

The sequence number wraps around after 65535.

**Timestamp**

The timestamp represents the media sampling or presentation time according to the RTP clock.

It is not necessarily the actual wall-clock time.

For example, an audio stream may use a clock rate of 8000 Hz.

If successive packets represent 160 audio samples:

$$
\Delta T=160
$$

The timestamp increases by 160 for each packet.

**Worked example**

Given:

- RTP clock rate = 8000 Hz.
- Samples per packet = 160.
- Initial timestamp = 5000.

Time represented by each packet:

$$
t=\frac{160}{8000}
$$
$$
t=0.02\text{ seconds}
$$

Therefore:

|Packet|Timestamp|
|---|--:|
|1|5000|
|2|5160|
|3|5320|
|4|5480|

The timestamp increment is based on the amount of media time represented, not simply the time between packet arrivals.

**SSRC**

Synchronization Source Identifier.

It identifies the source of an RTP stream.

**CSRC**

Contributing Source Identifier.

It identifies sources that contributed to a mixed RTP stream.

**Marker bit**

It can identify an important event in a media stream, depending on the payload format.

### 8. RTP over UDP

Your notes explain that RTP is encapsulated inside UDP rather than directly inside IP.

```
+------------------------+
|       IP Header        |
+------------------------+
|       UDP Header       |
+------------------------+
|       RTP Header       |
+------------------------+
|      Media Payload     |
+------------------------+
```

The RTP port can be dynamically selected.

The supplied notes describe an even-numbered RTP port and the immediately following odd-numbered RTCP port. This is the traditional RTP/RTCP port-pair convention, not a universal requirement of modern RTP deployments.

---

## H. REAL-TIME TRANSPORT CONTROL PROTOCOL $RTCP$

### 1. Core idea

RTP carries media data.

RTCP provides control information and feedback about the RTP transmission.

Think of them as two cooperating protocols.

```
          SENDER
             |
       +-----+-----+
       |           |
       v           v
      RTP        RTCP
       |           ^
       |           |
       v           |
      UDP          |
       |           |
       v           |
     Network       |
       |           |
       v           |
      RECEIVER ----+
```

### 2. Why RTCP exists

Suppose a video conference is experiencing:

- Packet loss.
- Jitter.
- Poor reception.
- Synchronization problems.

RTP carries the media, but RTCP provides reporting and feedback that helps participants understand transmission quality.

### 3. Five types of RTCP messages

Your notes identify five major RTCP message types. Pasted text

#### 1. Sender Report $SR$

Sent periodically by active senders.

It provides information about:

- Packets transmitted.
- Data transmitted.
- Timing information.
- Reception statistics available through report blocks.

The sender report includes an absolute reference timestamp, which helps synchronize different media streams.

**Example:** Audio and video may use separate RTP timestamp clocks. Sender reports help establish their relationship to a common time reference.

#### 2. Receiver Report $RR$

Sent by participants that are receiving media.

It provides information about transmission quality, including:

- Packet loss.
- Interarrival jitter.
- Extended highest sequence number received.

**Purpose:** It helps the sender understand how successfully its media is reaching receivers.

#### 3. Source Description $SDES$

Provides information about the source.

Examples:

- Name.
- Email address.
- Contact information.
- Source identifier.

#### 4. BYE

Announces that a source is leaving a session or stopping its stream.

```
Participant
     |
     | BYE
     v
Other Participants
     |
     v
Know that source has left
```

#### 5. Application-Specific $APP$

Allows applications to exchange application-specific control information.

It supports extensions beyond the standard RTCP message types.

### 4. RTP versus RTCP

|RTP|RTCP|
|---|---|
|Carries media data|Carries control and reporting information|
|Transports audio/video|Reports transmission statistics|
|Uses sequence numbers|Reports reception information|
|Uses timestamps|Helps synchronize streams|
|Supports media delivery|Supports monitoring and coordination|

**Memory rule:**

RTP = Media transport.

RTCP = Media feedback and control information.

---

## I. H.323 ARCHITECTURE

### 1. Core idea

H.323 is an ITU-T family of standards for multimedia communication over packet networks.

It supports communication between terminals and telephone-network systems.

The module focuses on communication between Internet-connected terminals and conventional telephone networks. Pasted text

### 2. H.323 architecture

Three important components are:

1. Terminal.
2. Gateway.
3. Gatekeeper.

```
      INTERNET NETWORK
              |
       +--------------+
       |   Terminal   |
       +--------------+
              |
              |
       +--------------+
       |  Gatekeeper  |
       +--------------+
              |
              |
       +--------------+
       |   Gateway    |
       +--------------+
              |
              v
       TELEPHONE NETWORK
              |
              v
           Telephone
```

### 3. Components explained

**Terminal**

A device that participates in multimedia communication.

Examples:

- Computer.
- IP telephone.
- Video terminal.

**Gateway**

Connects two different networks and translates between their communication systems.

For example:

```
Internet Protocols
        |
        v
     Gateway
        |
        v
Telephone Network Protocols
```

**Gatekeeper**

Manages functions such as:

- Registration.
- Address translation.
- Admission control.
- Bandwidth management.

Your notes compare its role with that of a registrar server.

### 4. Important H.323 protocols

|Protocol|Main function|
|---|---|
|H.225 RAS|Registration, admission and status|
|Q.931|Call establishment and termination|
|H.245|Capability exchange and logical-channel control|
|RTP|Audio/video transport|
|RTCP|Media feedback|
|G.711 / G.723.1|Audio codecs|

**Important clarification:** G.711 and G.723.1 are audio coding standards, not signaling protocols.

### 5. H.323 operation

Consider a computer calling a telephone.

```
Terminal
   |
   | 1. Discovery
   v
Gatekeeper
   |
   | 2. Bandwidth / admission
   v
Terminal
   |
   | 3. Q.931 call setup
   v
Gateway
   |
   v
Telephone
```

The detailed sequence is:

1. Terminal discovers the gatekeeper.
2. Terminal and gatekeeper communicate using H.225 RAS.
3. Q.931 establishes the call.
4. H.245 negotiates media capabilities and codecs.
5. RTP carries audio/video under RTCP monitoring.
6. Q.931 terminates the call.

### 6. Why separate protocols?

A multimedia call involves multiple independent tasks.

```
Registration        → H.225 RAS
Call establishment  → Q.931
Capability exchange → H.245
Media transmission  → RTP
Media feedback      → RTCP
```

This separation makes the architecture easier to manage.

---

## J. SESSION INITIATION PROTOCOL $SIP$

### 1. Core idea

SIP is an application-layer signaling protocol used to establish, modify and terminate multimedia sessions over IP networks.

It is defined in RFC 3261 in the supplied notes. Pasted text

Examples of SIP applications:

- Internet telephone calls.
- Video conferencing.
- Multimedia communication.
- Instant messaging.

### 2. How SIP works conceptually

Imagine Alice wants to call Bob.

Before transmitting voice, their devices need to establish a session.

They must determine:

- Who is calling?
- Who is receiving?
- Which media formats are supported?
- Where should media be transmitted?

SIP manages the signaling required for establishing the session.

### 3. SIP architecture

```
          ALICE
       SIP Endpoint
             |
             | SIP signaling
             v
          INTERNET
             |
             | SIP signaling
             v
           BOB
       SIP Endpoint

      <====== RTP ======>
        Audio / Video
```

Notice that SIP and RTP have different jobs.

- SIP establishes the communication session.
- RTP carries the actual audio/video.

### 4. SIP addressing

A SIP user can be identified using a SIP URI, for example:

```
sip:alice@example.com
```

SIP can also use telephone-number-based identities and IP-address-based endpoints.

### 5. SIP messages

SIP is text-based and uses request and response messages.

Important request methods include:

|Method|Function|
|---|---|
|INVITE|Initiates a session|
|ACK|Confirms receipt of a successful INVITE response|
|BYE|Terminates a session|
|CANCEL|Cancels a pending request|
|REGISTER|Registers a user's contact information|
|OPTIONS|Queries capabilities|

### 6. SIP session establishment

A simplified successful call sequence is:

```
          ALICE                         BOB
            |                            |
            |-------- INVITE ----------->|
            |                            |
            |<------- 200 OK ------------|
            |                            |
            |--------- ACK ------------->|
            |                            |
            |                            |
            |<====== RTP MEDIA =========>|
            |                            |
            |--------- BYE ------------->|
            |                            |
            |<------- 200 OK ------------|
```

### Explanation

**Step 1: INVITE**

Alice sends an INVITE request to Bob.

It can contain session information describing:

- Supported codecs.
- Media types.
- IP addresses.
- RTP port information.

**Step 2: Response**

Bob accepts the call and returns a successful response, commonly 200 OK.

**Step 3: ACK**

Alice sends ACK to confirm the successful INVITE exchange.

**Step 4: Media communication**

The endpoints exchange audio and video using the negotiated media transport.

**Step 5: BYE**

Either endpoint can terminate the session.

### 7. Handling codec mismatch

Suppose:

- Alice supports codec A.
- Bob supports codec B.
- There is no mutually supported codec.

The endpoints cannot directly communicate using an agreed audio format.

```
Alice supports A, B
          |
          v
       INVITE
          |
          v
Bob supports B, C
          |
          v
  Common codec = B
          |
          v
   Communication possible
```

If there is no common codec, the call may fail or require another compatible option.

### 8. SIP versus H.323

|Dimension|SIP|H.323|
|---|---|---|
|Standardization body|IETF|ITU-T|
|General approach|Text-based signaling|Protocol suite|
|Main purpose|Session establishment and management|Multimedia communication|
|Signaling|SIP messages|H.225, H.245 and Q.931|
|Media transport|Commonly RTP|Commonly RTP|
|Architecture|SIP endpoints and servers|Terminals, gateways and gatekeepers|

**Most important distinction:** SIP is a signaling protocol; H.323 is a broader multimedia communication standards framework.

---

## K. STREAM CONTROL TRANSMISSION PROTOCOL $SCTP$

### 1. Core idea

SCTP is a reliable, message-oriented transport-layer protocol.

It provides communication between endpoints using an association.

It combines reliable transmission with capabilities such as multistreaming and multihoming.

Your module identifies these as its major characteristics. Pasted text

### 2. SCTP architecture

```
       Application
            |
            v
      +-----------+
      |   SCTP    |
      +-----------+
            |
            v
           IP
            |
            v
         Network
```

### 3. Important SCTP features

#### 1. Connection-oriented communication

SCTP establishes an association before transferring data.

This is similar to TCP's connection-oriented approach.

#### 2. Multistreaming

One SCTP association can contain multiple independent streams.

```
             SCTP Association
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Stream 1  Stream 2  Stream 3
       Audio     Video     Control
```

**Why is this useful?**

If data in one stream is delayed, it need not automatically block delivery of independent messages in another stream.

This reduces application-level head-of-line blocking between streams.

#### 3. Message-oriented delivery

SCTP preserves message boundaries.

For example:

```
Sender:

Message A
Message B
Message C

       |
       v

Receiver:

Message A
Message B
Message C
```

This differs from TCP, which presents a continuous byte stream rather than preserving application message boundaries.

#### 4. Multihoming

An endpoint can have multiple IP addresses.

```
             SCTP Endpoint A
                /       \
               /         \
          IP Address 1  IP Address 2
               \         /
                \       /
                 Network
                    |
                    v
             SCTP Endpoint B
```

If one network path fails, another available path may be used.

#### 5. Reliability

SCTP uses acknowledgments and retransmissions to provide reliable delivery.

#### 6. Ordered and unordered delivery

SCTP supports both:

- Ordered delivery.
- Unordered delivery.

#### 7. Flow control

It helps prevent a sender from overwhelming a receiver.

### 4. SCTP versus TCP versus UDP

|Feature|TCP|UDP|SCTP|
|---|---|---|---|
|Connection-oriented|Yes|No|Yes|
|Reliability|Yes|No|Yes|
|Message-oriented|No|Datagram-oriented|Yes|
|Multiple streams|No|Application-dependent|Yes|
|Multihoming|No native transport support|No native transport support|Yes|
|Retransmission|Yes|No|Yes|
|Ordered delivery|Yes|No guarantee|Optional|

### 5. Applications

The module identifies:

- Telecommunication signaling.
- VoIP-related applications.
- WebRTC data channels.
- Reliable file transfer.

A useful clarification: WebRTC commonly uses SCTP over DTLS over UDP for its data channels. Media streams in WebRTC generally use RTP-based mechanisms.

### 6. When should SCTP be preferred?

Consider SCTP when an application requires:

- Reliable message delivery.
- Independent logical streams.
- Message boundaries.
- Multihoming.
- Flexible ordered/unordered delivery.

It is not automatically superior to TCP. The application requirements determine the choice.

---

# 2. PRACTICAL APPLICATION — TURN KNOWLEDGE INTO ABILITY

## A. COMPRESSION — THE FUNDAMENTAL IDEA

### 1. What is compression?

Compression reduces the number of bits needed to represent data.

For example:

```
Original data
1 0 1 0 1 0 1 0 1 0 1 0
             |
             v
         Compression
             |
             v
       Smaller representation
```

The objective is to reduce:

- Storage requirements.
- Transmission time.
- Bandwidth usage.
- Data-transfer costs.

Your notes identify compression as an algorithmic process that reduces data size. Pasted text

### 2. Compression ratio

A useful measure is:

$$
CR=\frac{\text{Original Size}}{\text{Compressed Size}}
$$

Suppose:

Original file size = 100 MB.

Compressed size = 25 MB.

Then:

$$
CR=\frac{100}{25}=4
$$

Therefore, the compression ratio is **4:1**.

Percentage size reduction:

$$
R=\frac{100-25}{100}\times100
$$
$$
R=75\%
$$

The compressed file is 75% smaller.

### 3. Two fundamental types

```
                COMPRESSION
                     |
           +---------+---------+
           |                   |
           v                   v
        Lossless              Lossy
           |                   |
           v                   v
    Exact reconstruction   Approximate reconstruction
```

|Lossless|Lossy|
|---|---|
|No information is permanently discarded|Some information is discarded|
|Exact reconstruction|Approximate reconstruction|
|Useful for text and archives|Useful for photos, audio and video|
|Often lower compression|Often higher compression|

**Example:**

- ZIP is a lossless compression format.
- JPEG is generally lossy.
- MP3 is generally lossy.

---

## B. AUDIO COMPRESSION

### 1. What is audio compression?

Audio compression reduces the amount of digital information required to represent sound.

It makes audio transmission and storage more efficient.

Your notes discuss PCM, ADPCM, predictive encoding and perceptual encoding. Pasted text

### 2. How sound becomes digital

Sound is a continuous physical signal.

A computer must convert it into discrete numerical values.

Three major operations are involved:

```
Analog Sound
     |
     v
 Sampling
     |
     v
Quantization
     |
     v
Binary Encoding
     |
     v
Digital Audio
```

### Sampling

Sampling measures the amplitude of a signal at regular time intervals.

For example:

```
Sound waveform:

       /\        /\
      /  \      /  \
-----/----\----/----\------> Time
    /      \  /      \

Sample points:
     •  •  •  •  •  •
```

The sampling frequency determines how many samples are taken per second.

### Quantization

Quantization maps measured amplitudes to a finite set of numerical values.

For example:

|Actual amplitude|Quantized value|
|--:|--:|
|2.1|2|
|2.8|3|
|4.2|4|
|5.7|6|

Quantization introduces an approximation error.

### PCM

Pulse Code Modulation represents sampled signal amplitudes using binary values.

If 8 bits are used per sample:

$$
2^8=256
$$

There are 256 possible quantization levels.

If 16 bits are used:

$$
2^{16}=65536
$$

There are 65,536 possible levels.

More bits generally allow finer amplitude representation.

### Audio bit-rate calculation

The uncompressed audio bit rate is:

$$
R=f_s\times b\times C
$$

Where:

- $f_s$ = sampling frequency.
- $b$ = bits per sample.
- $C$ = number of audio channels.

**Worked example**

Suppose CD-quality audio uses:

- Sampling frequency = 44,100 Hz.
- Bits per sample = 16.
- Stereo channels = 2.

Then:

$$
R=44100\times16\times2
$$
$$
R=1,411,200\text{ bits/s}
$$
$$
\boxed{R=1.4112\text{ Mbps}}
$$

This explains why compression is useful for distributing high-quality audio over networks.

### ADPCM

Adaptive Differential Pulse Code Modulation.

Instead of encoding the entire sample value, predictive methods encode differences between samples.

```
Original samples:

100, 105, 109, 112, 114

Differences:

100, +5, +4, +3, +2
```

The differences may require fewer bits to represent.

ADPCM adapts its quantization step size to the signal.

**Main idea:** Encode changes rather than repeatedly encoding complete values.

### Predictive encoding

Your notes describe predictive encoding as representing differences between samples rather than the original sampled values. It is particularly associated with speech compression. Pasted text

Examples mentioned:

- GSM.
- G.729.
- G.723.1.

### Perceptual encoding

Perceptual encoding uses characteristics of human hearing to decide which information can be removed with less noticeable impact.

MP3 is a well-known example.

### Frequency masking

A loud sound at one frequency can make a nearby, quieter sound less noticeable.

```
Sound intensity
      |
      |       Loud sound
      |          /\
      |         /  \
      |________/____\________
      |     Quiet sound
      |        /\ 
      |_______/  \____________
              Frequency
```

The quieter sound may be masked by the louder sound.

### Temporal masking

A loud sound can temporarily reduce our ability to hear quieter sounds immediately before or after it.

### Perceptual encoding workflow

```
         Audio Signal
              |
              v
        Frequency Analysis
              |
              v
       Psychoacoustic Model
              |
              v
       Determine Masking
              |
              v
       Allocate Available Bits
              |
              v
          Quantization
              |
              v
         Entropy Coding
              |
              v
        Compressed Audio
```

### Predictive versus perceptual encoding

|Predictive encoding|Perceptual encoding|
|---|---|
|Encodes differences or predictions|Uses human hearing characteristics|
|Common in speech coding|Common in music coding|
|Exploits signal redundancy|Exploits perceptual irrelevance|
|Example: ADPCM|Example: MP3|

### Audio compression: advantages and disadvantages

**Advantages**

- Reduced bandwidth.
- Smaller files.
- Faster transmission.
- Reduced storage costs.

**Disadvantages**

- Processing is required.
- Lossy compression may reduce sound quality.
- Devices must support compatible formats.
- Excessive compression can produce noticeable artifacts.

### Important distinction: Audio data compression versus audio level compression

Your notes identify two different meanings of audio compression. Pasted text

|Audio data compression|Audio level compression|
|---|---|
|Reduces the amount of digital audio data|Reduces the dynamic range of sound|
|Reduces file size|Controls loudness|
|Used in MP3|Used in recording studios|
|Lossless or lossy|Downward or upward compression|

**Downward compression:** Reduces loud sounds above a threshold.

**Upward compression:** Increases quieter sounds below a threshold.

Do not confuse these two concepts in examinations.

---

## C. IMAGE COMPRESSION

### 1. Core idea

Image compression reduces the amount of information needed to represent an image.

It can be:

- Lossless.
- Lossy.

### 2. Lossless versus lossy image compression

|Lossless|Lossy|
|---|---|
|Original image can be reconstructed exactly|Some image information is discarded|
|No permanent information loss|Permanent information loss|
|Suitable for exact preservation|Suitable for compact photographic images|

### 3. JPEG compression

JPEG stands for Joint Photographic Experts Group.

JPEG is a commonly used lossy image compression method.

It exploits the fact that human vision is generally less sensitive to certain high-frequency image details than to large-scale brightness and structure.

Your notes explain that JPEG uses transform coding and takes advantage of human visual characteristics. Pasted text

### Why does JPEG exist?

Consider a photograph.

It may contain millions of pixel values.

However, neighbouring pixels often have related colours and brightness.

JPEG exploits this structure to represent the image more efficiently.

### 4. JPEG compression: complete workflow

This is one of the most important diagrams in Module 4.

```
              INPUT IMAGE
                   |
                   v
          Divide into 8 × 8 Blocks
                   |
                   v
           RGB → YCbCr Conversion
                   |
                   v
             Chroma Subsampling
                   |
                   v
             Apply 2-D DCT
                   |
                   v
              Quantization
                   |
                   v
              Zigzag Scan
                   |
                   v
            DC Differential Coding
                   |
                   v
             AC Run-Length Coding
                   |
                   v
             Entropy Coding
                   |
                   v
             COMPRESSED JPEG
```

The JPEG steps in your notes include splitting, colour transformation, subsampling, DCT, quantization, zigzag scanning, differential coding, run-length coding and entropy coding. Pasted text

Let's understand each stage.

### Step 1: Splitting into 8 × 8 blocks

The image is divided into blocks containing 64 pixels.

```
Original Image
+-----------------------+
|                       |
|                       |
|                       |
|                       |
+-----------------------+

After division:

+------+------+
| 8×8  | 8×8  |
+------+------+
| 8×8  | 8×8  |
+------+------+
```

**Why?**

Processing smaller blocks makes frequency transformation and compression manageable.

### Step 2: RGB to YCbCr conversion

RGB represents an image using:

- Red.
- Green.
- Blue.

JPEG commonly transforms colour information into YCbCr.

|Component|Meaning|
|---|---|
|Y|Luminance or brightness|
|Cb|Blue-difference chrominance|
|Cr|Red-difference chrominance|

The key idea is separating brightness from colour information.

### Step 3: Chroma subsampling

Human vision is generally more sensitive to brightness detail than to colour detail.

Therefore, JPEG can retain more luminance information while reducing chrominance resolution.

```
Luminance $Y$       Chrominance (Cb, Cr)

Every pixel         Fewer samples
+--+--+             +-------+
|  |  |             |       |
+--+--+             +-------+
|  |  |             |       |
+--+--+             +-------+
```

For example, in 4:2:0 subsampling, each 2 × 2 group of pixels shares one Cb sample and one Cr sample, while retaining four Y samples.

This reduces colour information while preserving more brightness detail.

### Step 4: Discrete Cosine Transform $DCT$

**This is the mathematical foundation of JPEG.**

DCT transforms image information from the spatial domain into the frequency domain.

Spatial domain:

- Pixel positions.
- Brightness values.

Frequency domain:

- How rapidly brightness changes across the image.

Imagine a block with gradually changing brightness.

Most of its information can often be represented using a small number of low-frequency coefficients.

#### Visual intuition

```
Spatial domain                 Frequency domain

Pixel values                   DCT coefficients

+----------------+             +----------------+
| 100 101 102 103 |             | DC | Low freq  |
| 101 102 103 104 |     DCT     |---------------|
| 102 103 104 105 | ----------> | Low  Medium   |
| 103 104 105 106 |             |---------------|
+----------------+             | Medium  High  |
                               +----------------+
```

The top-left coefficient is the DC coefficient.

The remaining coefficients are AC coefficients.

- DC represents the average or overall level of the block.
- AC represents variations and spatial-frequency details.

#### DCT formula

For an 8 × 8 block, the two-dimensional DCT is:

$$
F(u,v)=\frac{1}{4}C(u)C(v) \sum_{x=0}^{7}\sum_{y=0}^{7} f(x,y) \cos\left[\frac{(2x+1)u\pi}{16}\right] \cos\left[\frac{(2y+1)v\pi}{16}\right]
$$

Where:

- $f(x,y)$ = input pixel value.
- $F(u,v)$ = DCT coefficient.
- $u,v$ = frequency coordinates.

The normalization factor is:

$$
C(k)= \begin{cases} \frac{1}{\sqrt{2}},&k=0\\ 1,&k>0 \end{cases}
$$

**What does this equation accomplish?**

It represents the 64 pixel values as 64 frequency coefficients.

The transformation itself is reversible. Information loss occurs mainly in the next stage.

### Step 5: Quantization

Quantization reduces the precision of DCT coefficients.

$$
Q(u,v)=\operatorname{round} \left(\frac{F(u,v)}{T(u,v)}\right)
$$

Where:

- $F(u,v)$ = DCT coefficient.
- $T(u,v)$ = quantization-table value.
- $Q(u,v)$ = quantized coefficient.

**Worked example**

Suppose:

$$
F(u,v)=87
$$
$$
T(u,v)=10
$$

Then:

$$
Q(u,v)=\operatorname{round}(87/10)
$$
$$
\boxed{Q(u,v)=9}
$$

During decoding:

$$
F'(u,v)=9\times10=90
$$

The reconstructed coefficient is 90 rather than 87.

The difference represents information loss.

**Why is quantization important?**

It is the principal lossy stage of baseline JPEG.

Larger quantization values generally produce:

- More compression.
- Lower image quality.

Smaller quantization values generally produce:

- Less compression.
- Higher image quality.

### Step 6: Zigzag scanning

After quantization, the 8 × 8 matrix is converted into a one-dimensional sequence.

The zigzag pattern places low-frequency coefficients earlier and higher-frequency coefficients later.

```
+----+----+----+----+
|  0 |  1 |  5 |  6 |
+----+----+----+----+
|  2 |  4 |  7 | 12 |
+----+----+----+----+
|  3 |  8 | 11 | 13 |
+----+----+----+----+
|  9 | 10 | 14 | 15 |
+----+----+----+----+
```

This is a simplified representation of zigzag ordering.

**Why?**

High-frequency coefficients often become zero after quantization.

Zigzag scanning groups these zeros toward the end of the sequence.

### Step 7: DC differential coding

DC coefficients often have similarities between neighbouring image blocks.

Instead of coding every DC coefficient independently, JPEG commonly codes the difference from the previous DC coefficient.

Example:

```
DC values:

100, 105, 108, 110

Differences:

100, +5, +3, +2
```

Smaller differences can be represented efficiently.

### Step 8: Run-Length Encoding $RLE$

RLE compresses repeated values.

In JPEG, it is particularly useful for sequences of zero-valued AC coefficients.

Example:

```
Original:

0, 0, 0, 0, 7, 0, 0, 3

Encoded:

$4,7$, $2,3$
```

Each pair indicates:

- Number of preceding zeros.
- Next nonzero coefficient.

Special symbols handle longer zero runs and the end of the block.

### Step 9: Huffman coding

Huffman coding assigns shorter codes to frequently occurring symbols and longer codes to less frequent symbols.

Example:

|Symbol|Frequency|Code|
|---|--:|---|
|A|50|0|
|B|25|10|
|C|15|110|
|D|10|111|

Frequently occurring symbols receive shorter codes.

This stage is lossless.

### 5. JPEG: where does information loss occur?

|Stage|Lossy or lossless?|
|---|---|
|8 × 8 splitting|Lossless|
|RGB to YCbCr|Normally reversible only approximately if finite-precision rounding is involved|
|Chroma subsampling|Lossy|
|DCT|Mathematically reversible|
|Quantization|Lossy|
|Zigzag scan|Lossless|
|DC differential coding|Lossless|
|RLE|Lossless|
|Huffman coding|Lossless|

**Examination point:** Quantization is the principal lossy stage in JPEG, while chroma subsampling can also discard information.

### 6. JPEG advantages

- Efficient photographic compression.
- Supports colour and grayscale photographs.
- Reduces storage requirements.
- Suitable for many photographic applications.
- Allows adjustment of the quality/compression trade-off.

### 7. JPEG limitations

- Some image information is permanently lost.
- Excessive compression creates visible artifacts.
- Poorer performance for sharp text and edges.
- Repeated recompression can reduce quality.

**Professional insight:** JPEG is not the best choice for every image. Screenshots, diagrams and text-heavy graphics may benefit from lossless or alternative formats.

---

## D. VIDEO COMPRESSION — MPEG

### 1. Core idea

Video is a sequence of images displayed over time.

For example, a video running at 30 frames per second contains 30 images every second.

If each frame were transmitted independently, the data requirement would be very large.

MPEG reduces video size using two major approaches:

1. Intra-frame compression.
2. Inter-frame compression.

Your module identifies both approaches and explains their use in MPEG. Pasted text

### 2. Intra-frame compression

Each frame is compressed independently.

```
Frame 1 → Compression
Frame 2 → Compression
Frame 3 → Compression
Frame 4 → Compression
```

It does not depend on information from neighbouring frames.

MPEG uses JPEG-like techniques for individual frame compression.

Advantages:

- Easier independent decoding.
- Suitable for static or low-motion content.
- Does not require neighbouring frames for reconstruction.

Disadvantage:

- Usually requires more data than effective inter-frame compression.

### 3. Inter-frame compression

Inter-frame compression exploits similarities between successive frames.

Consider a person walking.

Most of the background remains unchanged.

Instead of transmitting the entire background repeatedly, the encoder can represent changes relative to reference frames.

```
Frame 1              Frame 2              Frame 3

+----------+         +----------+         +----------+
|          |         |          |         |          |
|   Person |         |    Person|         |     Person
|          |         |          |         |          |
+----------+         +----------+         +----------+

        Similar background
        Different person position
```

### Main idea

Transmit the reference information and describe how parts of the image move or change.

### 4. Motion compensation

Motion compensation is the foundation of inter-frame compression.

The encoder searches for a similar block in a reference frame.

Instead of transmitting the entire current block, it can transmit:

- A motion vector.
- Prediction error (residual).

```
Reference Frame              Current Frame

+----------+                 +----------+
|          |                 |          |
|   [A]    |  ---- Motion -->|    [A]   |
|          |                 |          |
+----------+                 +----------+

              Motion vector
```

### Motion vector

A motion vector represents the displacement between a block and its predicted position in a reference frame.

For example:

$$
MV=(+4,-2)
$$

This means a displacement of four pixels horizontally and two pixels vertically under the chosen coordinate convention.

### Motion estimation

The encoder searches for a suitable matching block.

Conceptually:

$$
MV^*=\arg\min_{MV}D(B,C(MV))
$$

Where:

- $B$ = current block.
- $C(MV)$ = candidate reference block.
- $D$ = matching error measure.
- $MV^*$ = selected motion vector.

A practical encoder may minimize a rate-distortion cost rather than matching error alone.

### 5. I, P and B frames

MPEG defines three important picture types.

#### I-frame (Intra-coded)

An I-frame is encoded independently.

```
I-frame
   |
   v
Independent image coding
```

It serves as an anchor for other frames.

#### P-frame (Predicted)

A P-frame is encoded using a preceding reference I-frame or P-frame.

```
I-frame --------> P-frame
                  |
                  v
             Motion prediction
```

#### B-frame (Bidirectionally predicted)

A B-frame uses reference frames from both the past and future.

```
Past Reference       Future Reference
      I/P                   I/P
       \                     /
        \                   /
         \                 /
             B-frame
```

It can use:

- Forward prediction.
- Backward prediction.
- Bidirectional prediction.

### 6. Comparison of I, P and B frames

|Feature|I-frame|P-frame|B-frame|
|---|---|---|---|
|Full independent coding|Yes|No|No|
|Uses previous reference|No|Yes|Can|
|Uses future reference|No|No|Can|
|Compression efficiency|Usually lower|Higher|Often higher|
|Dependency|None for image reconstruction|Reference frame|Reference frames|

### 7. Group of Pictures $GOP$

A GOP is a group of video pictures organized around reference frames.

Example:

```
Display order:

I  B  B  P  B  B  P  B  B  I

Reference frames:
I -------- P -------- P -------- I
 \         |          |
  \--------B frames---/
```

**Important:** B-frames may depend on a future reference frame. Consequently, decoding order can differ from display order.

This is why a future reference frame may need to be transmitted before the B-frames that depend on it.

### 8. MPEG compression workflow

Your notes describe the following intra-frame process. Pasted text

```
          VIDEO FRAME
               |
               v
       Scaling and Colour
          Conversion
               |
               v
        Colour Subsampling
               |
               v
               DCT
               |
               v
          Quantization
               |
               v
          Run-Length
           Encoding
               |
               v
          Huffman Coding
               |
               v
       COMPRESSED FRAME
```

For inter-frame coding, motion compensation adds another level of redundancy reduction.

### 9. Intra-frame versus inter-frame compression

|Feature|Intra-frame|Inter-frame|
|---|---|---|
|Basic idea|Compress individual frames|Exploit similarities across frames|
|Uses neighbouring frames|No|Yes|
|Main technique|Transform coding|Motion compensation and residual coding|
|Compression efficiency|Usually lower|Usually higher|
|Complexity|Lower|Higher|
|Random access|Easier|Depends on reference structure|

### 10. MPEG advantages

- High compression efficiency.
- Suitable for streaming.
- Adjustable quality/compression trade-offs.
- Widely supported MPEG-family formats.
- Can reduce transmission and storage requirements.

### 11. MPEG disadvantages

- Loss of information in lossy encoding.
- Encoding and decoding complexity.
- Potential quality degradation at high compression.
- Motion artifacts and blocking artifacts.
- Compatibility and licensing considerations for particular standards.

---

## E. WHEN SHOULD I USE EACH METHOD?

This is how an engineer thinks about selecting a method.

|Requirement|Suitable approach|
|---|---|
|Download a document reliably|TCP-based transfer|
|Real-time audio delivery|RTP over a suitable transport|
|Control recorded media playback|RTSP|
|Monitor RTP reception quality|RTCP|
|Establish an Internet telephone session|SIP|
|Communicate using H.323 infrastructure|H.323 protocol suite|
|Reliable multi-stream message delivery|SCTP|
|Compress speech|Predictive/audio coding|
|Compress music|Perceptual audio coding|
|Compress photographs|JPEG|
|Compress video|MPEG-family video coding|

These are typical choices, not exclusive rules.

---

## F. HOW TO IMPLEMENT AND EVALUATE THE METHODS

### 1. Practical networking tools

|Tool|Purpose|
|---|---|
|Wireshark|Inspect RTP, SIP, UDP and other network packets|
|FFmpeg|Encode, decode and convert audio/video|
|VLC|Play and inspect multimedia streams|
|GStreamer|Build multimedia processing pipelines|
|Python|Perform calculations and analyze media files|

### 2. Inspecting a multimedia call using Wireshark

A useful educational procedure:

1. Open Wireshark.
2. Select the relevant network interface.
3. Start packet capture.
4. Make a test call or play a network stream.
5. Stop capture.
6. Filter for SIP or RTP traffic.
7. Inspect packet headers.
8. Examine sequence numbers and timestamps.
9. Investigate packet loss and timing irregularities.

Example display filters:

```
sip
```

```
rtp
```

```
udp
```

**What should you examine?**

- Source and destination IP addresses.
- UDP ports.
- RTP sequence numbers.
- RTP timestamps.
- Payload type.
- RTCP reports.

A packet capture shows observed traffic, not necessarily the entire application's internal state.

### 3. Evaluating multimedia quality

Useful performance measurements include:

|Metric|Meaning|
|---|---|
|Throughput|Actual data delivered per second|
|Latency|Time taken for data to travel|
|Jitter|Variation in packet arrival timing|
|Packet loss|Percentage of packets not received|
|Bitrate|Number of transmitted bits per second|
|PSNR|Pixel-based reconstruction quality|
|SSIM|Structural similarity between images|

For real-time communication, delay and jitter may matter more than perfect packet recovery.

For compression, quality must be evaluated alongside the reduction in data size.

### 4. JPEG quality evaluation

Suppose an original image has size 5 MB.

After compression, the JPEG file is 500 KB.

Compression ratio:

$$
CR=\frac{5000}{500}=10
$$

Therefore:

$$
\boxed{CR=10:1}
$$

However, compression ratio alone does not prove that the result is visually acceptable.

Compare:

- Visual quality.
- PSNR.
- SSIM.
- File size.
- Visible compression artifacts.

### 5. MPEG/video evaluation

For video, examine:

- Bitrate.
- Frame rate.
- Resolution.
- Compression ratio.
- PSNR or SSIM.
- Motion artifacts.
- Playback smoothness.

A small file with severe visual distortion is not necessarily a successful compression result.

---

## G. WHAT IF THE METHOD FAILS?

### Networking failure diagnosis

```
          Poor Media Quality
                  |
                  v
         Is the network delayed?
              /       \
            Yes        No
             |          |
             v          v
        Inspect RTT   Check packet loss
                          |
                          v
                  Inspect RTP sequence
                          |
                          v
                    Check jitter
                          |
                          v
                   Inspect bitrate
                          |
                          v
                  Check decoder/codec
```

|Symptom|Possible cause|Investigation|
|---|---|---|
|Audio interruption|Packet loss|Inspect RTP sequence numbers|
|Robotic audio|Codec or packet-loss problem|Examine decoder and packet statistics|
|Audio/video mismatch|Timestamp or synchronization issue|Inspect RTP/RTCP timing|
|Buffering|Insufficient throughput|Measure network throughput|
|Call cannot connect|Signaling problem|Inspect SIP or H.323 exchange|
|High delay|Network congestion or buffering|Measure latency|

### Compression failure diagnosis

|Symptom|Possible cause|Possible correction|
|---|---|---|
|Blurry JPEG|Excessive quantization|Reduce compression strength|
|Block artifacts|Coarse quantization|Improve quality settings|
|Large JPEG file|Low compression|Adjust quantization and encoding|
|MPEG motion artifacts|Poor prediction or excessive compression|Improve bitrate or encoding settings|
|Poor audio quality|Excessive lossy compression|Increase bitrate or choose another codec|

### Important diagnostic principle

Do not immediately blame the compression algorithm.

A poor multimedia result may originate from:

- Bad source data.
- Incorrect codec settings.
- Network congestion.
- Packet loss.
- Decoder incompatibility.
- Insufficient bandwidth.

Diagnose the actual cause before changing the system.

---

## H. REAL-WORLD CASE STUDY — DESIGNING A VIDEO-CONFERENCING SYSTEM

**Scenario:** A university wants to provide online lectures to students in different locations.

The following values are hypothetical and used only to demonstrate engineering reasoning.

### 1. Problem

The university requires:

- Live audio.
- Live video.
- Two-way communication.
- Low delay.
- Acceptable video quality.
- Efficient bandwidth usage.

### 2. Available information

Assume:

- 100 students.
- Each student's available bandwidth varies.
- The lecturer uses a camera and microphone.
- The lecturer needs to interact with students.

### 3. Method selection

A suitable conceptual design includes:

|Requirement|Technology|
|---|---|
|Session establishment|SIP or another session-signaling mechanism|
|Audio/video transport|RTP-based transport|
|Media feedback|RTCP|
|Audio compression|Suitable speech/audio codec|
|Video compression|Suitable video codec|
|Playback or presentation|Multimedia client|

SCTP may also be useful for reliable message-oriented data channels, depending on the application.

### 4. Step-by-step workflow

```
       Lecturer Camera/Microphone
                  |
                  v
            Audio/Video
              Encoding
                  |
                  v
          Media Packetization
                  |
                  v
              RTP-based
              Transport
                  |
                  v
               Network
                  |
         +--------+--------+
         |                 |
         v                 v
      Student 1         Student 2
         |                 |
         v                 v
      Decode            Decode
         |                 |
         v                 v
      Playback          Playback
```

### 5. Evaluation

The university should measure:

- Audio delay.
- Video delay.
- Packet loss.
- Jitter.
- Video quality.
- Bandwidth consumption.
- Synchronization.

### 6. Professional decision

If video quality is poor but packet loss is low, the cause may be insufficient bitrate or aggressive compression.

If audio is intermittent, the cause may be packet loss or jitter.

If audio and video are out of synchronization, inspect timestamp relationships and playback buffering.

**The lesson:** A professional does not solve every multimedia problem by increasing bandwidth. The correct intervention depends on the measured failure mechanism.

# 3. EXPERT INSIGHT — THINK LIKE A SPECIALIST

This section develops the reasoning needed to distinguish protocols, evaluate compression systems and diagnose real-world problems.

## A. Recognize which protocol is needed

A common beginner mistake is assuming that RTP, RTSP, RTCP and SIP perform similar functions.

They do not.

### The protocol-selection decision tree

```
         What does the application need?
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       Establish   Control      Transport
       a session   playback     media
          |           |           |
          v           v           v
         SIP         RTSP        RTP
                                  |
                                  v
                            Feedback and
                             statistics
                                  |
                                  v
                                 RTCP
```

If the requirement is reliable message-oriented communication with multiple independent streams, consider SCTP.

If the requirement is interoperability between an Internet terminal and telephone-network infrastructure using the H.323 framework, consider H.323.

### Questions an expert asks

1. Is the application one-way or interactive?
2. Is the media recorded or generated live?
3. How much delay is acceptable?
4. Does the application require reliable delivery?
5. Is packet retransmission useful?
6. What codec formats are supported?
7. How will media synchronization be maintained?
8. How will transmission quality be monitored?

These questions should come before selecting a protocol.

---

## B. Check assumptions

Every multimedia system depends on assumptions.

|Assumption|Why it matters|What happens if violated?|
|---|---|---|
|Sufficient bandwidth|Media needs adequate transmission capacity|Buffering or quality reduction|
|Compatible codecs|Sender and receiver must understand the media format|Playback failure|
|Appropriate packetization|Packets must represent manageable media units|Increased overhead or delay|
|Correct timestamps|Media timing must be preserved|Synchronization errors|
|Acceptable network delay|Media must arrive in time|Poor interaction|
|Appropriate compression|Data size must be reduced without unacceptable quality loss|Distortion or excessive bandwidth|

**Important:** An assumption violation does not always make a protocol invalid. It may make the complete application unsuitable or reduce its performance.

---

## C. Select compression methods intelligently

The most important decision is whether exact reconstruction is necessary.

```
             What is the data?
                    |
          +---------+---------+
          |                   |
          v                   v
       Text/Data          Audio/Image/Video
          |                   |
          v                   v
    Is exact recovery     Is exact recovery
       necessary?           necessary?
          |                   |
       Yes / No             Yes / No
          |                   |
          v                   v
    Lossless or          Lossless or
    appropriate         Lossy compression
    representation
```

### Comparison of major techniques

|Method|Main principle|Main application|Information loss|
|---|---|---|---|
|PCM|Represents sampled amplitudes|Digital audio|Quantization error relative to analog signal|
|ADPCM|Encodes differences with adaptive quantization|Speech/audio|Depends on quantization|
|MP3|Perceptual audio coding|Music|Lossy|
|JPEG|DCT and quantization|Photographs|Lossy|
|MPEG|Spatial and temporal redundancy reduction|Video|Generally lossy|
|RLE|Represents repeated symbols efficiently|Data and image coding|Lossless|
|Huffman|Variable-length coding|Compression systems|Lossless|

### The most important conceptual distinction

Compression methods exploit different kinds of redundancy.

```
DATA REDUNDANCY
      |
      +---------------------------+
      |                           |
      v                           v
Spatial/Temporal              Statistical
Redundancy                     Redundancy
      |                           |
      v                           v
DCT / Prediction              Huffman Coding
      |                           |
      +-------------+-------------+
                    |
                    v
              Smaller Data
```

JPEG and MPEG use transform and prediction techniques to make data easier to encode.

Huffman coding then exploits statistical patterns in the resulting symbols.

---

## D. Avoid common mistakes

|Mistake|Why it is incorrect|Correct understanding|
|---|---|---|
|RTP guarantees packet delivery|RTP has no built-in delivery guarantee|RTP provides sequencing and timing information|
|RTSP carries the video itself|RTSP is primarily a control protocol|Media is delivered separately|
|RTCP is identical to RTP|They have different functions|RTCP provides reports and control information|
|SIP transmits audio|SIP establishes and manages sessions|RTP commonly carries the media|
|H.323 is a single protocol|It is a standards framework|It coordinates multiple protocols|
|SCTP is identical to TCP|SCTP supports multistreaming and message boundaries|Both provide reliable transport, but differ significantly|
|JPEG's DCT causes the main information loss|DCT is mathematically reversible|Quantization causes the principal lossy reduction|
|Huffman coding loses information|It is a lossless coding technique|It changes representation, not information|
|Every video frame is independent|Inter-frame coding uses reference frames|P and B frames can depend on other frames|
|Higher compression always means better performance|Quality can deteriorate|Compression must balance size and fidelity|

---

## E. Understand subtle limitations

### 1. RTP cannot solve network congestion by itself

RTP adds timing and sequence information.

However, it does not automatically:

- Guarantee delivery.
- Prevent congestion.
- Repair missing packets.
- Guarantee synchronization.

Applications require additional mechanisms for handling these issues.

### 2. UDP is not automatically better than TCP

UDP avoids TCP's built-in retransmission and ordered-delivery behaviour.

However, UDP can still experience:

- Packet loss.
- Congestion.
- Jitter.
- Reordering.

A real-time application must manage these conditions.

### 3. JPEG is not suitable for every image

JPEG performs well on photographs.

However, text and diagrams contain sharp edges that may become distorted under lossy compression.

### 4. MPEG inter-frame compression introduces dependencies

If a reference frame is damaged or unavailable, dependent frames may also be affected.

This is an important reason why reference-frame placement and recovery strategies matter.

### 5. Compression ratio does not equal quality

A compression ratio of 20:1 may be useful for one application but unacceptable for another.

The correct evaluation depends on the information that must be preserved.

---

## F. Verify results independently

A professional should never rely on only one measurement.

### Networking checks

**1. Sequence-number check**

Are packets missing or arriving out of order?

**2. Timestamp check**

Does the media timing advance consistently according to the payload clock?

**3. Throughput check**

Is the available throughput sufficient for the media bitrate?

**4. Delay check**

Does the delay satisfy the application's requirements?

**5. RTCP check**

What do receiver reports indicate about loss and jitter?

### Compression checks

**1. Compression ratio**

$$
CR=\frac{S_o}{S_c}
$$

**2. Percentage size reduction**

$$
R=\frac{S_o-S_c}{S_o}\times100
$$

**3. Reconstruction error**

For numerical signals:

$$
MSE=\frac{1}{N}\sum_{i=1}^{N}(x_i-\hat{x}_i)^2
$$

Where:

- $x_i$ = original sample.
- $\hat{x}_i$ = reconstructed sample.
- $N$ = number of samples.

A smaller MSE indicates a smaller average squared reconstruction error.

For image quality, PSNR can be calculated as:

$$
PSNR=10\log_{10} \left(\frac{MAX^2}{MSE}\right)
$$

Where $MAX$ is the maximum possible pixel value.

For 8-bit images:

$$
MAX=255
$$

**Interpretation:** Higher PSNR generally indicates lower pixel-level reconstruction error. However, PSNR does not perfectly represent perceived visual quality.

---

## G. Separate evidence from interpretation

Consider this hypothetical observation:

A JPEG image is reduced from 5 MB to 500 KB.

What can we conclude?

**Established mathematical fact:**

The compression ratio is 10:1.

**Observable result:**

The compressed file occupies less storage.

**What we cannot conclude from file size alone:**

- That image quality is acceptable.
- That important details are preserved.
- That the image is suitable for medical diagnosis.
- That the same compression ratio will occur for other images.

This distinction is important in engineering and research.

---

## H. Know when to stop

An engineer should stop modifying a system when:

1. The original requirement has been satisfied.
2. Performance has been validated under representative conditions.
3. Remaining errors are within acceptable limits.
4. Important failure cases have been examined.
5. The result is reproducible.

For high-stakes applications, such as medical image transmission, ordinary visual inspection and compression ratios are insufficient.

Additional validation, regulatory requirements and domain expertise may be necessary.

---

## I. Compare the most important related concepts

### 1. RTSP versus RTP versus RTCP

|Dimension|RTSP|RTP|RTCP|
|---|---|---|---|
|Main function|Playback control|Media transport|Feedback and reporting|
|Carries actual media?|Not normally|Yes|No, primarily control information|
|Timing information|Session-related control|Media timestamps|Synchronization reports|
|Typical operations|PLAY, SETUP|Packet transmission|SR, RR, SDES, BYE|
|Main purpose|Control streaming|Deliver media|Monitor media|

### 2. SIP versus H.323

|Dimension|SIP|H.323|
|---|---|---|
|Nature|Signaling protocol|Standards framework|
|Developed by|IETF|ITU-T|
|Session setup|INVITE|H.225/Q.931 mechanisms|
|Capability negotiation|Session description mechanisms|H.245|
|Media|RTP commonly|RTP commonly|
|Architecture|Endpoints and SIP servers|Terminals, gateways and gatekeepers|

### 3. TCP versus UDP versus SCTP

|Dimension|TCP|UDP|SCTP|
|---|---|---|---|
|Reliability|Yes|No|Yes|
|Connection-oriented|Yes|No|Yes|
|Message boundaries|Not preserved|Datagram boundaries|Preserved|
|Multistreaming|No|Not inherently|Yes|
|Multihoming|Not natively|Not natively|Yes|
|Retransmission|Yes|No|Yes|

### 4. Intra-frame versus inter-frame compression

|Dimension|Intra-frame|Inter-frame|
|---|---|---|
|Compression basis|Individual frame|Multiple related frames|
|Uses motion information|No|Yes|
|Complexity|Lower|Higher|
|Compression efficiency|Generally lower|Generally higher|
|Error propagation|More localized|Can affect dependent frames|
|Example|JPEG-style frame coding|MPEG prediction|

### 5. JPEG versus MPEG

|Dimension|JPEG|MPEG|
|---|---|---|
|Main purpose|Still-image compression|Video compression|
|Input|Image|Sequence of images|
|Main transformation|DCT|DCT plus temporal prediction|
|Motion compensation|No|Yes, in inter-frame coding|
|Frame types|Not applicable|I, P and B|
|Main advantage|Efficient photo compression|Efficient video compression|

---

# 4. MEMORY ANCHOR — MAKE THE KNOWLEDGE RECONSTRUCTABLE

This is the condensed conceptual framework for the entire module.

## One sentence

**Multimedia networking delivers time-dependent audio/video information efficiently, while compression reduces its data size without unacceptable loss of quality.**

## Three essential points

### 1. Networking protocols have different responsibilities

- RTSP controls streaming.
- RTP carries media.
- RTCP reports media quality.
- SIP establishes multimedia sessions.
- H.323 provides a multimedia communication framework.
- SCTP provides reliable, multistream transport.

### 2. Compression exploits redundancy

- Audio compression exploits signal redundancy and hearing characteristics.
- JPEG exploits spatial redundancy and visual characteristics.
- MPEG exploits both spatial and temporal redundancy.

### 3. Quality is a trade-off

More compression can reduce data size but may introduce distortion.

Similarly, reliable delivery may increase delay, while real-time delivery must prioritize timely information.

## One misconception

**Incorrect:** RTP, RTSP and RTCP are interchangeable multimedia protocols.

**Correct:** RTP transports media, RTSP controls streaming, and RTCP provides reporting and feedback.

## One practical decision rule

Identify the application's actual requirement before selecting a protocol or compression technique.

- Session establishment → SIP.
- Playback control → RTSP.
- Media delivery → RTP.
- Transmission feedback → RTCP.
- Reliable multistream messages → SCTP.
- Still photographs → JPEG.
- Video → MPEG-family coding.

## One visual summary

```
              MULTIMEDIA SYSTEM
                      |
          +-----------+-----------+
          |                       |
          v                       v
       NETWORKING              COMPRESSION
          |                       |
          v                       v
    Session Control          Audio Coding
          |                  Image Coding
          v                  Video Coding
     SIP / H.323                  |
          |                       v
          v                  PCM / MP3
    Media Control              JPEG
          |                    MPEG
          v
         RTSP
          |
          v
     Media Transport
          |
          v
         RTP
          |
          v
      RTCP Feedback
          |
          v
     Quality Monitoring
```

## One transfer principle

Whenever you encounter a new multimedia system, separate the problem into three questions:

1. How is the communication session established?
2. How is the media transported and controlled?
3. How is the media represented efficiently?

This framework can help you understand technologies beyond those explicitly listed in Module 4.

# 5. EXAMINATION AND APPLICATION READINESS

This section focuses on the knowledge and reasoning needed to produce strong university examination answers.

## A. Examination-Relevant Understanding

The following topics deserve particular attention.

|Priority|Topic|What you should be able to explain|
|---|---|---|
|Very high|Types of multimedia services|Stored, live and interactive streaming|
|Very high|Streaming approaches|Four architectures and their differences|
|Very high|RTP|Architecture, packet format and header fields|
|Very high|RTCP|Five message types and their functions|
|Very high|JPEG|Complete compression process|
|Very high|MPEG|Intra-frame and inter-frame compression|
|High|SIP|Architecture, messages and call establishment|
|High|H.323|Components, protocols and operation|
|High|Audio compression|PCM, ADPCM and perceptual encoding|
|High|SCTP|Features and comparison with TCP/UDP|
|Medium|Compression fundamentals|Lossy/lossless and compression ratio|

### Important diagrams to practise

These diagrams are particularly useful in theory examinations:

1. Four approaches to streaming stored audio/video.
2. RTP packet format.
3. RTCP message types.
4. H.323 architecture.
5. SIP call establishment.
6. SCTP multistreaming and multihoming.
7. Audio compression workflow.
8. JPEG compression flowchart.
9. MPEG I, P and B frames.

**Examination strategy:** When a question asks you to explain a protocol, include its purpose, architecture, working sequence, important fields or messages, and an application.

A definition alone is rarely a complete explanation.

---

## B. Common Examination Traps

|Question area|Common mistake|Correct approach|
|---|---|---|
|Streaming|Confusing live and stored streaming|Explain when content is generated|
|RTSP|Saying RTSP carries media|Explain its control function|
|RTP|Claiming guaranteed delivery|Explain timestamps and sequencing|
|RTCP|Confusing SR and RR|Distinguish sender and receiver reports|
|H.323|Treating H.225 and H.245 as identical|Explain their separate roles|
|SIP|Omitting ACK|Explain the successful INVITE exchange|
|SCTP|Saying it is byte-oriented like TCP|Explain message boundaries|
|Audio|Confusing audio data and level compression|Explain their different objectives|
|JPEG|Claiming DCT causes information loss|Identify quantization as the main lossy stage|
|JPEG|Omitting zigzag scanning|Explain how it groups high-frequency coefficients|
|MPEG|Assuming every frame is independent|Explain temporal prediction|
|MPEG|Confusing P and B frames|Explain their reference frames|

---

## C. Worked Problem-Solving Examples

The following examples cover common numerical and conceptual examination patterns.

### Example 1: Calculate audio bit rate

**Problem**

An audio signal is sampled at 48 kHz using 16 bits per sample and two channels.

Calculate the uncompressed bit rate.

**Step 1: Given**

$$
f_s=48000\text{ Hz}
$$
$$
b=16
$$
$$
C=2
$$

**Step 2: Formula**

$$
R=f_s\times b\times C
$$

**Step 3: Substitute**

$$
R=48000\times16\times2
$$
$$
R=1536000\text{ bits/s}
$$

**Answer**

$$
\boxed{R=1.536\text{ Mbps}}
$$

**Interpretation**

The audio requires 1.536 Mbps before compression.

**Independent check:** Doubling the number of channels doubles the bit rate, provided all other parameters remain unchanged.

---

### Example 2: Calculate compression ratio

**Problem**

An image originally occupies 12 MB. After compression, its size is 3 MB.

Calculate:

1. Compression ratio.
2. Percentage reduction.

**Given**

$$
S_o=12\text{ MB}
$$
$$
S_c=3\text{ MB}
$$

**Compression ratio**

$$
CR=\frac{S_o}{S_c}
$$
$$
CR=\frac{12}{3}
$$
$$
\boxed{CR=4:1}
$$

**Percentage reduction**

$$
R=\frac{12-3}{12}\times100
$$
$$
R=\frac{9}{12}\times100
$$
$$
\boxed{R=75\%}
$$

**Interpretation:** The compressed image occupies 25% of its original size.

---

### Example 3: Calculate RTP timestamp increment

**Problem**

An audio stream uses an RTP clock rate of 8000 Hz. Each packet contains 160 audio samples.

Calculate the timestamp increment and packet duration.

**Step 1: Timestamp increment**

$$
\Delta T=160
$$

**Step 2: Duration**

$$
t=\frac{\text{Samples per packet}}{\text{Sampling frequency}}
$$
$$
t=\frac{160}{8000}
$$
$$
\boxed{t=0.02\text{ seconds}}
$$

Therefore:

- Timestamp increment = 160.
- Packet duration = 20 milliseconds.

**Interpretation:** Each packet represents 20 ms of audio.

---

### Example 4: Explain JPEG quantization

**Problem**

A DCT coefficient has a value of 76, and its quantization-table value is 8.

Find the quantized coefficient.

**Formula**

$$
Q=\operatorname{round}\left(\frac{F}{T}\right)
$$

**Substitute**

$$
Q=\operatorname{round}\left(\frac{76}{8}\right)
$$
$$
Q=\operatorname{round}(9.5)
$$

Under the usual nearest-integer convention used for this example:

$$
\boxed{Q=10}
$$

Reconstructed coefficient:

$$
F'=Q\times T
$$
$$
F'=10\times8
$$
$$
\boxed{F'=80}
$$

The original coefficient was 76, but the reconstructed coefficient is 80.

**Conclusion:** Quantization introduces approximation and is responsible for information loss.

---

### Example 5: Explain MPEG frame prediction

**Problem**

Explain why B-frames can achieve efficient compression.

**Answer reasoning**

1. Adjacent video frames often contain similar image information.
2. B-frames use reference frames from both the past and future.
3. The encoder identifies matching image blocks.
4. Motion vectors describe their displacement.
5. Residual information represents differences that prediction cannot explain.
6. Less information may need to be transmitted than when encoding the complete frame independently.

**Conclusion:** B-frames exploit temporal redundancy using bidirectional prediction.

---

## D. What Distinguishes an Excellent Examination Answer?

Consider the question:

**Explain JPEG image compression.**

|Answer quality|Characteristics|
|---|---|
|Inadequate|JPEG is an image compression technique that reduces image size.|
|Competent|Explains 8 × 8 blocks, YCbCr, DCT, quantization and encoding.|
|Excellent|Explains the purpose of every stage, the mathematical role of DCT, why quantization causes information loss, the function of zigzag scanning and entropy coding, and the quality/compression trade-off.|

### A good answer structure for a 10-mark question

For a question on JPEG compression, organize your response as follows:

1. Definition and purpose.
2. Lossy compression principle.
3. JPEG block diagram.
4. Explanation of 8 × 8 block division.
5. RGB to YCbCr conversion.
6. Chroma subsampling.
7. DCT transformation.
8. Quantization.
9. Zigzag scanning.
10. DC differential coding, AC run-length coding and entropy coding.
11. Advantages and limitations.

This provides a logical and comprehensive answer.

### Another example: Explain RTP

A strong answer should include:

1. Definition.
2. Position in the protocol architecture.
3. RTP packet format.
4. Explanation of header fields.
5. Sequence-number operation.
6. Timestamp operation.
7. SSRC and CSRC.
8. RTP over UDP.
9. Applications.
10. Limitations.

---

## E. Independent Application

Consider a new situation:

A company wants to build a platform that provides:

- Recorded lectures.
- Live lectures.
- Interactive student-teacher communication.
- Downloadable lecture recordings.

How would you approach the design?

### Step 1: Classify the requirements

|Requirement|Multimedia category|
|---|---|
|Recorded lectures|Stored streaming|
|Live lectures|Live streaming|
|Teacher-student video call|Interactive multimedia|
|Downloadable recordings|File transfer|

### Step 2: Select suitable technologies

|Requirement|Possible technology|
|---|---|
|Stored-media playback control|RTSP|
|Real-time media transport|RTP|
|Transmission feedback|RTCP|
|Session establishment|SIP or another signaling mechanism|
|Audio compression|Suitable audio codec|
|Image/video compression|JPEG/MPEG-family or other suitable codecs|
|Reliable downloads|TCP-based transfer|

### Step 3: Identify evaluation criteria

- Playback delay.
- Audio clarity.
- Video quality.
- Bandwidth consumption.
- Packet loss.
- Synchronization.
- Compatibility.
- Storage requirements.

### Step 4: Make the decision

A system should not use one protocol for every requirement.

Instead, select technologies according to their responsibilities.

That is the key transferable engineering principle from this module.

---

# ADDITIONAL SYLLABUS COVERAGE: LZ AND LZW TEXT COMPRESSION

Your Module 4 outline explicitly lists LZ and LZW coding, but the uploaded lecture material does not provide their detailed explanations. Pasted text

For syllabus completeness, here is a concise supplementary explanation.

## 1. LZ compression

LZ refers to the Lempel–Ziv family of dictionary-based lossless compression algorithms.

The central idea is to identify repeated patterns and represent them using references to previously encountered information.

Example:

```
Original:

ABCABCABCABC

Repeated pattern:

ABC

Instead of storing the complete pattern
repeatedly, use references to earlier data.
```

The original data can be reconstructed exactly.

## 2. LZW compression

LZW stands for Lempel–Ziv–Welch.

It is a dictionary-based lossless compression algorithm.

### Basic working principle

1. Initialize a dictionary with individual symbols.
2. Read the input sequence.
3. Identify the longest sequence already in the dictionary.
4. Output its dictionary code.
5. Add a new sequence to the dictionary.
6. Continue until the input is processed.

### Conceptual flowchart

```
          Input Data
               |
               v
        Initialize Dictionary
               |
               v
        Read Next Symbol
               |
               v
     Find Longest Dictionary Match
               |
               v
          Output Code
               |
               v
       Add New Dictionary Entry
               |
               v
          More Input?
           /       \
         Yes        No
          |          |
          v          v
       Repeat      Finish
```

### LZ versus LZW

|LZ family|LZW|
|---|---|
|Family of dictionary-based algorithms|Specific dictionary-based algorithm|
|Different variants use different dictionary representations|Builds a dictionary of sequences|
|Exploits repeated patterns|Exploits repeated symbol sequences|
|Lossless|Lossless|

**Important:** This is supplementary teaching, not a detailed explanation taken from your uploaded lecture notes.

---

# FINAL EXAMINATION REVISION MAP

Use this table to connect the entire module.

|Topic|Central concept|Most important thing to remember|
|---|---|---|
|Multimedia networking|Audio/video communication|Three categories of multimedia services|
|Stored streaming|On-demand media|Four delivery approaches|
|RTSP|Playback control|SETUP, PLAY, TEARDOWN|
|RTP|Real-time media transport|Timestamp and sequence number|
|RTCP|Feedback|Five message types|
|H.323|Multimedia framework|Terminal, gateway, gatekeeper|
|SIP|Session signaling|INVITE, response, ACK, BYE|
|SCTP|Reliable transport|Multistreaming and multihoming|
|PCM|Digital audio representation|Sampling and quantization|
|ADPCM|Predictive audio coding|Encodes differences|
|MP3|Perceptual audio coding|Frequency and temporal masking|
|JPEG|Still-image compression|DCT and quantization|
|MPEG|Video compression|I, P, B frames and motion compensation|
|LZ/LZW|Dictionary compression|Repeated-pattern representation|

## The five most important conceptual connections

1. **RTSP versus RTP:** Control versus transport.
2. **RTP versus RTCP:** Media versus feedback.
3. **SIP versus H.323:** Signaling protocol versus multimedia standards framework.
4. **Lossless versus lossy compression:** Exact versus approximate reconstruction.
5. **JPEG versus MPEG:** Spatial compression versus spatial and temporal compression.

These distinctions are especially valuable because they help you answer unfamiliar questions without depending entirely on memorized definitions.

