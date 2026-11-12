**Prepared by:** Shadil AM  
**LinkedIn:** [Shadil AM](https://www.linkedin.com/in/shadilam/)  
**Placement Portfolio:** [Shadil AM — Placement Portfolio](https://rayyancodingschool.shadilrayyan2.workers.dev/)

**AI Assistance Disclosure:** These learning notes were prepared by Shadil AM with the assistance of ChatGPT.

---

## Module overview

Quality of Service (QoS) is about controlling how a network treats different traffic so that applications receive suitable levels of performance. The module progresses from the mechanisms used to manage traffic, through QoS architectures and forwarding technologies, to network performance problems and networks that must operate despite long delays or interruptions.

### Subtopic map

|Subtopic|Simple meaning|Why it matters|Expected ability|
|---|---|---|---|
|QoS architectural framework|Organizing mechanisms that control network service|Provides the foundation for QoS|Explain the three planes|
|QoS routing|Choosing paths based on performance requirements|Avoids paths that cannot meet application needs|Explain constraints and path selection|
|Integrated Services (IntServ)|QoS management for individual flows|Supports quantitative resource requirements|Explain service classes and reservations|
|ISDN|Digital integration of voice and data over telephone infrastructure|Illustrates integrated digital communication|Explain interfaces and services|
|RSVP|Signalling protocol for requesting resources|Establishes reservations along a path|Trace PATH and RESV|
|Differentiated Services (DiffServ)|Treating groups of traffic according to class|Improves scalability|Explain marking and per-hop behaviour|
|MPLS|Forwarding packets using labels|Supports controlled paths and traffic engineering|Trace label operations|
|VPNs and tunnelling|Carrying traffic through an overlay connection|Connects networks securely or across incompatible networks|Explain encapsulation and VPN types|
|Destination-based forwarding|Mapping destinations to forwarding decisions and labels|Explains how MPLS forwarding works|Trace label distribution and swapping|
|Explicit routing|Directing traffic along a specified path|Enables traffic engineering beyond ordinary destination-based routing|Explain FECs and explicit paths|
|Network performance issues|Problems that reduce communication quality|Supports diagnosis and improvement|Identify symptoms and causes|
|Delay-tolerant networking (DTN)|Transmitting data when continuous connectivity is unavailable|Supports intermittently connected networks|Explain store-and-forward and bundles|

### Concept map

```
                 INTERNETWORK QUALITY OF SERVICE
                              |
       +----------------------+----------------------+
       |                      |                      |
   QoS FRAMEWORK          QoS ARCHITECTURES      FORWARDING
       |                      |                      |
  +----+----+             +---+----+              +---+----+
  |    |    |             |        |              |        |
Control Data Management IntServ  DiffServ        MPLS   Tunnelling
Plane  Plane Plane        |        |              |        |
  |                      RSVP   Traffic classes  Labels   VPNs
QoS routing                |        |              |
Resource reservation   Per-flow  Aggregation  Label switching
       |
       +-----------------------------------------------+
                                                       |
                                               PERFORMANCE
                                                       |
                                          Bottlenecks / Congestion
                                          Interference / Malware
                                          Hardware / Software
                                                       |
                                                       v
                                          DELAY-TOLERANT NETWORKS
                                          Store-and-forward bundles
```

### Learning outcomes

- **Understand:** Explain why networks need QoS and how the major architectures and forwarding mechanisms work.
- **Apply:** Trace RSVP reservations, DiffServ classification, MPLS label switching, VPN encapsulation and basic performance diagnosis.
- **Reason independently:** Choose an appropriate architecture, identify its assumptions, evaluate trade-offs and explain why a design may fail.

**Mental model:** QoS is the overall objective; QoS architectures decide how service is organized; signalling and forwarding mechanisms implement that organization; monitoring determines whether the expected performance is actually achieved.

---

# 1. CORE NOTES — UNDERSTAND THE CONCEPT DEEPLY

## A. Topic overview

### What is Quality of Service?

A network carries different kinds of traffic:

- Voice calls need low delay and low variation in delay.
- Video conferencing needs sufficient throughput and stable delivery.
- File transfers need reliable delivery but can often tolerate more delay.
- Email and background transfers usually tolerate variable response times.

A network that treats all packets identically may not satisfy all these requirements during congestion.

**Quality of Service (QoS)** is the set of network mechanisms and policies used to control the service experienced by traffic. These mechanisms may classify traffic, reserve resources, select routes, manage queues, prioritize packets and monitor service agreements.

QoS does not automatically create more physical bandwidth. It manages the available resources and determines how they are shared.

### Four important performance measures

|Measure|Meaning|Common unit|Why it matters|
|---|---|---|---|
|Bandwidth|Maximum theoretical transmission capacity|bit/s|Determines the capacity available|
|Throughput|Actual rate of successful data delivery|bit/s|Shows achieved performance|
|Latency|Time taken for data to travel from source to destination|ms or s|Important for interactive applications|
|Jitter|Variation in packet delay|ms|Affects real-time audio and video|
|Packet loss|Fraction or percentage of packets that fail to arrive|%|Can degrade voice, video and data delivery|

**Important distinction:** Bandwidth and throughput are not the same. A 100 Mbit/s link does not guarantee that an application will receive 100 Mbit/s of useful data.

---

## B. Core idea

QoS uses network mechanisms to give traffic an appropriate level of service according to application requirements and network policies.

Its fundamental principle is:

> Identify traffic requirements, manage available resources, apply suitable forwarding treatment, and evaluate the resulting service.

QoS is not one protocol. It is an architectural approach implemented through multiple mechanisms.

---

## C. Prerequisite knowledge

|Prerequisite|Explanation|Connection to QoS|
|---|---|---|
|Packet switching|Data is divided into packets and forwarded through networks|QoS mechanisms control packet treatment|
|Routing|Selecting a path from source to destination|QoS routing considers performance constraints|
|Switching|Forwarding data through network devices|MPLS uses label switching|
|IP addressing|Identifying network destinations|Used in ordinary IP forwarding|
|Queuing|Holding packets until they can be transmitted|Determines packet waiting time|
|Bandwidth|Link transmission capacity|Resource reservations depend on available capacity|
|Encapsulation|Wrapping one protocol packet inside another|Fundamental to tunnelling and VPNs|
|Encryption|Transforming information so unauthorized parties cannot read it|Used to protect VPN traffic|

### Basic packet-processing model

```
Application data
      |
      v
  Segmentation
      |
      v
Packet creation
      |
      v
Classification
      |
      v
Queue selection
      |
      v
Scheduling / forwarding
      |
      v
Destination
```

A packet may pass through several routers. Each router can introduce processing delay, queuing delay and transmission delay.

---

## D. Visual intuition: the three QoS planes

The QoS architectural framework organizes network mechanisms into three logical planes: Control, Data and Management. The source emphasizes that these are logical groupings, not necessarily separate physical devices. Pasted text

### 1. Control Plane

The Control Plane deals with the paths through which traffic travels.

Its mechanisms include:

- Admission control.
- QoS routing.
- Resource reservation.

**Admission control** determines whether a network has enough resources to accept a new request.

**QoS routing** selects a path that is likely to satisfy the flow's requirements.

**Resource reservation** allocates resources along the selected path.

### 2. Data Plane

The Data Plane directly handles user traffic.

Its mechanisms include:

- Buffer management.
- Congestion avoidance.
- Packet marking.
- Queuing and scheduling.
- Traffic classification.
- Traffic policing.
- Traffic shaping.

### 3. Management Plane

The Management Plane handles network operation and administration.

Its mechanisms include:

- Service Level Agreements (SLAs).
- Traffic restoration.
- Metering and recording.
- Policy.

### Diagram

```
                 QoS ARCHITECTURAL FRAMEWORK
                            |
          +-----------------+-----------------+
          |                 |                 |
          v                 v                 v
     CONTROL PLANE      DATA PLANE       MANAGEMENT PLANE
          |                 |                 |
     QoS routing       Classification         SLA
     Admission         Packet marking         Policy
     control           Queuing                 Metering
     Reservation       Scheduling              Recording
                       Shaping                 Restoration
                       Policing
```

**How to read the diagram:**

- The Control Plane determines whether and where traffic can be supported.
- The Data Plane applies forwarding and traffic-treatment mechanisms.
- The Management Plane defines and monitors the administrative rules.

**Central insight:** A path decision alone does not guarantee performance. Resource reservation and suitable packet treatment may also be required.

### Node-specific and network-segment mechanisms

A QoS mechanism can apply at different scales:

- **Node-specific:** Buffer management inside one router.
- **Segment-wide:** QoS routing across multiple routers.

The framework does not require a single implementation structure. A mechanism may be centralized or distributed. Pasted text

---

## E. Why QoS routing exists

Traditional shortest-path routing selects a path according to a metric such as hop count or administrative cost.

However, the shortest path may not have enough bandwidth or may have excessive delay.

QoS routing selects a path based on the requirements of a traffic flow.

### Example

Consider two possible routes:

```
                 ROUTE A
             R1 -------- R2
              \          /
               \        /
                \      /
                 \    /
                  R3

                 ROUTE B
             R1 -------- R4 -------- R2
```

Suppose the measured conditions are:

|Route|Delay|Available bandwidth|
|---|--:|--:|
|A|40 ms|2 Mbit/s|
|B|65 ms|15 Mbit/s|

A flow requires at least 10 Mbit/s.

- Route A has lower delay but insufficient bandwidth.
- Route B has higher delay but sufficient bandwidth.

If bandwidth is the strict requirement, Route B is the feasible choice.

### QoS routing versus shortest-path routing

|Dimension|Shortest-path routing|QoS routing|
|---|---|---|
|Main objective|Minimize a routing metric|Satisfy traffic requirements|
|Typical metrics|Hop count, cost|Bandwidth, delay, cost|
|Computation|Often simpler|Can be more complex|
|Network-state information|May be relatively stable|Can change frequently|
|Signalling|Depends on routing protocol|Often requires additional information|
|Main challenge|Finding a low-cost route|Finding a feasible route without excessive complexity|

### QoS routing does not guarantee QoS by itself

A route may appear capable of meeting a flow's requirements, but another flow may consume the available resources before the reservation is made.

Therefore:

```
QoS requirements
       |
       v
   QoS routing
       |
       v
 Select feasible path
       |
       v
 Resource reservation
       |
       v
 Admission control
       |
       v
 Apply traffic treatment
```

The source explicitly notes that QoS routing determines a path likely to accommodate the requested performance; resource reservation is needed to reserve the required resources along that path. Pasted text

### Constraint-based routing

Constraint-based routing extends the idea by considering:

- Traffic attributes.
- Network constraints.
- Administrative policies.

It can bypass congested areas or distribute traffic across paths to improve network utilization.

### Complexity trade-off

As the number of QoS metrics increases, path computation can become expensive.

For practical reasons, schemes may use:

- One metric, such as bandwidth.
- Two metrics, such as cost-delay.
- Metric ordering.
- Sequential filtering.
- Source, distributed or hierarchical routing strategies.

These methods can reduce computational complexity, sometimes at the expense of global optimality.

---

## F. Integrated Services Architecture (IntServ)

### Core idea

Integrated Services (IntServ) is an IP QoS architecture that supports resource management for individual traffic flows.

A **flow** is a stream of packets associated with a particular communication session or traffic description.

IntServ can reserve resources at each router along a path for flows that request QoS.

The source describes three service classes. Pasted text

### Three IntServ service classes

|Class|Meaning|Typical application fit|
|---|---|---|
|Guaranteed service|Provides specified bandwidth and bounded delay under its service conditions|Critical, delay-sensitive traffic|
|Controlled-load service|Attempts to provide service similar to a lightly loaded network|Adaptive real-time applications|
|Best-effort service|No specific resource guarantee|Elastic applications such as ordinary file transfers|

**Important:** The source describes Guaranteed Service as providing bandwidth, bounded delay and no-loss guarantees. In a technically careful interpretation, the precise service guarantees depend on the service specification, traffic conformance and the network elements supporting it. Do not assume that an arbitrary end-to-end Internet path can provide absolute zero packet loss.

### IntServ operation

```
Sender
  |
  | Flow sends traffic requirements
  v
Router 1
  |
  v
Router 2
  |
  v
Router 3
  |
  v
Receiver

At each router:
- Check available resources
- Apply admission control
- Maintain flow-related state
- Reserve resources if accepted
```

### Per-flow state

Each participating router maintains information about the flows for which it has accepted reservations.

This allows precise treatment but creates a scalability challenge.

If a core router carries a very large number of flows, maintaining and updating state for every flow can require significant memory and processing.

### Advantages

- Supports quantitative service requirements.
- Can provide fine-grained control.
- Service classes correspond to different application needs.
- Can be useful in controlled enterprise or access networks.

### Limitations

- Requires signalling.
- Requires per-flow state in participating routers.
- Requires support along the relevant path for end-to-end guarantees.
- Can become difficult to scale in large provider backbones.

The source identifies per-flow soft-state maintenance and end-to-end signalling as major scalability concerns. Pasted text

---

## G. ISDN — Integrated Services Digital Network

### Core idea

ISDN is a set of communication standards designed to provide digital transmission of voice, video, data and other services over traditional telephone-network infrastructure.

It integrates multiple types of communication over digital channels.

**Do not confuse ISDN with IntServ.**

- **IntServ:** An IP Quality of Service architecture.
- **ISDN:** A digital telecommunications network standard.

They are separate concepts, even though both appear in this module.

### ISDN channel structure

ISDN uses B-channels and D-channels.

|Channel|Function|
|---|---|
|B-channel|Carries user information such as voice or data|
|D-channel|Carries signalling information|

### Basic Rate Interface $BRI$

The source gives the BRI structure as:

- Two B-channels, each 64 kbit/s.
- One D-channel, 16 kbit/s.

Calculation:

$$
R_{\text{BRI}} = 2(64) + 16
$$
$$
R_{\text{BRI}} = 144\text{ kbit/s}
$$

The source additionally describes 48 kbit/s of overhead, giving:

$$
R_{\text{required}} = 144 + 48
$$
$$
\boxed{R_{\text{required}} = 192\text{ kbit/s}}
$$

### Primary Rate Interface $PRI$

The source describes a common North American PRI configuration:

- 23 B-channels.
- One D-channel.
- Each channel at 64 kbit/s.

$$
R_{\text{PRI}} = 23(64) + 64
$$
$$
= 1472 + 64
$$
$$
\boxed{R_{\text{PRI}} = 1536\text{ kbit/s}}
$$

Adding 8 kbit/s overhead:

$$
R_{\text{required}} = 1536 + 8
$$
$$
\boxed{R_{\text{required}} = 1544\text{ kbit/s}}
$$

This is the familiar 1.544 Mbit/s PRI rate.

**Regional distinction:** The source also notes that PRI may use 30 B-channels in other countries. The 23B + D arrangement is not universal.

### BRI and PRI comparison

|Feature|BRI|PRI|
|---|---|---|
|B-channels|2|23 or 30, depending on regional standard|
|D-channel|16 kbit/s|64 kbit/s|
|Main use|Smaller installations|Larger installations|
|Capacity|Lower|Higher|

### Broadband ISDN $B-ISDN$

The source associates B-ISDN with higher transmission rates and the development of fibre-optic infrastructure.

### ISDN service categories

|Service|Function|Examples|
|---|---|---|
|Bearer service|Transfers information without changing its content|Voice, data and video transport|
|Teleservice|Provides a complete user-oriented communication service|Telephony, telefax, teleconferencing|
|Supplementary service|Adds extra functions to other services|Call waiting, reverse charging|

### ISDN principles

The source identifies these principles:

1. Support switched and non-switched applications.
2. Support voice and non-voice applications.
3. Reliance on 64-kbit/s connections.
4. Intelligence in the network.
5. Layered protocol architecture.
6. Variety of configurations.

### Advantages and limitations

**Advantages**

- Digital transmission.
- Integrated services.
- Multiple digital channels.
- Improved voice quality compared with traditional analogue transmission.
- Reliable channel connections.

**Limitations**

- Installation and maintenance cost.
- Specialized equipment requirements.
- Limited coverage.
- Obsolescence compared with modern broadband access technologies.

The source presents ISDN as a historical digital-access technology. Its numerical configurations are useful for examination calculations, but should not be mistaken for a description of the dominant modern broadband access network.

---

## H. RSVP — Resource Reservation Protocol

### Core idea

RSVP is a signalling protocol used to request and establish resource reservations for flows.

In the IntServ model, RSVP communicates the requirements of a flow and supports reservation along its path.

### The two main RSVP messages

- **PATH:** Travels from the sender toward the receiver.
- **RESV:** Travels from the receiver back toward the sender.

### RSVP operation

```
             PATH MESSAGE
Sender --------------------------> Receiver
       R1             R2              |
                                      |
             RESV MESSAGE            |
Sender <------------------------------+
       R1             R2
```

### Step-by-step explanation

1. The sender initiates a PATH message.
2. PATH travels downstream toward the receiver.
3. Routers along the path learn information about the flow and the path.
4. The receiver sends a RESV message upstream.
5. Each router checks whether the requested reservation can be supported.
6. A router accepts or rejects the reservation according to resource availability and policy.
7. If the reservation succeeds along the path, the flow receives the requested treatment subject to the service conditions.

### Soft state

RSVP routers maintain **soft state**.

A soft state is temporary information that is refreshed periodically. If refresh messages stop arriving, the state eventually expires.

```
Reservation established
        |
        v
State stored at router
        |
        v
Periodic refresh messages
        |
        +------ Received? ------+
        |                       |
       Yes                      No
        |                       |
        v                       v
  Keep state              State expires
```

### Why soft state matters

- It reduces the need for explicit teardown in every failure situation.
- It allows state to expire if communication stops.
- It requires periodic refresh signalling.

### Advantages

- Supports per-flow reservations.
- Can support quantitative service requirements.
- Allows admission control at participating routers.

### Limitations

- Signalling overhead.
- Per-flow state in routers.
- Scalability challenges in large networks.
- End-to-end guarantees require suitable support along the path.

The source describes PATH and RESV operation and the periodic refresh of soft state. Pasted text

---

## I. Differentiated Services (DiffServ)

### Core idea

Differentiated Services is a scalable IP QoS architecture that classifies packets into a limited number of traffic classes.

Instead of maintaining reservation state for every individual flow throughout the network, DiffServ groups many flows into aggregates.

### IntServ versus DiffServ: visual intuition

```
INTSERV
=======

Flow A ---- Reservation ----+
Flow B ---- Reservation ----+---- Routers maintain per-flow state
Flow C ---- Reservation ----+
Flow D ---- Reservation ----+


DIFFSERV
========

Flow A --+
Flow B --+
Flow C --+---- Classification ---- Traffic Class 1
Flow D --+

Many flows are aggregated into a smaller number of classes.
```

### How DiffServ works

1. Traffic enters a DiffServ domain.
2. The ingress router classifies the traffic.
3. The router marks packets with an appropriate Differentiated Services Code Point $DSCP$.
4. Packets move through the network.
5. Routers examine the class marking.
6. Each router applies an appropriate Per-Hop Behaviour $PHB$.

### DS field and DSCP

The IP header contains a Differentiated Services field.

The DSCP uses six bits, allowing:

$$
2^6 = 64
$$

possible codepoint values.

The remaining two bits are used for Explicit Congestion Notification $ECN$.

**Correction to a common source simplification:** The source refers to reclaiming the ToS byte to provide 256 levels. The modern DS field is eight bits in total, but the DSCP itself is six bits, not eight. Therefore, the number of DSCP codepoints is 64, not 256.

### Per-Hop Behaviour $PHB$

A PHB specifies how a router treats packets belonging to a particular traffic class.

For example, a network may configure:

|Traffic class|Example traffic|Intended treatment|
|---|---|---|
|Real-time|Voice|Low queuing delay|
|Interactive|Video conferencing|Preferential treatment|
|Standard|Web traffic|Normal forwarding|
|Background|Bulk transfer|Lower priority|

These are illustrative class assignments, not universal mandatory mappings.

### DiffServ architecture

```
      CUSTOMER NETWORK
             |
             v
       INGRESS ROUTER
             |
      Classification
             |
       Meter / Mark
             |
       Traffic shaping
             |
             v
     +-------------------+
     |  DiffServ domain  |
     |                   |
     | Router 1          |
     | Router 2          |
     | Router 3          |
     |                   |
     | PHB at each hop   |
     +-------------------+
             |
             v
       EGRESS ROUTER
             |
             v
       Destination
```

### Traffic conditioning

Traffic conditioning can include:

- Metering: measuring traffic against a profile.
- Marking: assigning a traffic class.
- Shaping: delaying packets to control the sending rate.
- Policing: enforcing a traffic profile, often by dropping or remarking excess traffic.

### Advantages

- Scalable traffic aggregation.
- Reduced signalling requirements.
- No need for per-flow reservation state in every core router.
- Supports differentiated service classes.
- Can be deployed incrementally.

### Limitations

- Service quality depends heavily on correct network provisioning.
- Class markings do not automatically guarantee end-to-end performance.
- Congestion can still occur.
- Traffic patterns and routing changes can invalidate assumptions made during provisioning.
- Quantitative guarantees may require additional signalling and admission control.

The source emphasizes that DiffServ simplifies core forwarding by using traffic aggregates, but that provisioning and end-to-end service construction remain difficult. Pasted text

### IntServ and DiffServ comparison

|Dimension|IntServ|DiffServ|
|---|---|---|
|Main approach|Per-flow resource reservation|Class-based traffic treatment|
|State|Per-flow state|Aggregate/class state|
|Signalling|Generally required for reservation|Usually minimized in the core|
|Scalability|More difficult at large scale|Better suited to large networks|
|Control granularity|Fine-grained|Class-based|
|Resource guarantees|Can support quantitative reservations|Relative differentiation by default|
|Typical use|Controlled enterprise/access environments|Provider and enterprise backbones|

### Hybrid RSVP–DiffServ model

A hybrid approach uses:

- RSVP at the network edge.
- DiffServ in the backbone.

This combines flow-level admission or reservation at the edge with scalable class-based forwarding in the core.

---

## J. Multiprotocol Label Switching $MPLS$

### Core idea

MPLS forwards packets using short labels rather than requiring every intermediate router to perform a full IP destination lookup.

It is often described as operating at **Layer 2.5**, between the Data Link and Network layers.

### Why MPLS exists

Traditional IP forwarding generally uses the destination address and a longest-prefix-match lookup.

MPLS establishes label-switched paths so that intermediate devices can forward packets using label information.

### MPLS label structure

The source describes a 32-bit MPLS label stack entry:

|Field|Size|Function|
|---|--:|---|
|Label|20 bits|Label value|
|Traffic Class|3 bits|Traffic treatment information|
|Bottom of Stack|1 bit|Indicates the final label in the stack|
|TTL|8 bits|Limits packet lifetime|

Total:

$$
20+3+1+8 = 32\text{ bits}
$$

### MPLS components

|Component|Meaning|
|---|---|
|LER|Label Edge Router; adds or removes labels at the edge|
|LSR|Label Switching Router; forwards packets using labels|
|LSP|Label Switched Path; path followed by labelled packets|
|FEC|Forwarding Equivalence Class; group of packets receiving the same forwarding treatment|
|Label|Short identifier used for forwarding|

### Label operations

- **Push:** Add a label.
- **Swap:** Replace an incoming label with an outgoing label.
- **Pop:** Remove a label.

### MPLS packet flow

```
IP PACKET
    |
    v
Ingress LER
    |
    | PUSH label
    v
LSR 1
    |
    | SWAP label
    v
LSR 2
    |
    | SWAP label
    v
Egress LER
    |
    | POP label
    v
Original IP packet forwarded
```

### Step-by-step example

Suppose a packet enters an MPLS network.

1. The ingress LER examines the packet.
2. It determines the packet's FEC.
3. It pushes an MPLS label.
4. Intermediate LSRs inspect the label.
5. Each LSR swaps the label according to its forwarding table.
6. The egress router removes the label.
7. The original packet continues toward its destination.

### Forwarding Equivalence Class $FEC$

A FEC is a group of packets that receive the same forwarding treatment.

Packets may be grouped according to:

- Destination prefix.
- Customer.
- Traffic class.
- Other configured criteria.

The important insight is that a label identifies a forwarding treatment, not necessarily a unique individual packet.

### MPLS label-stack example

MPLS supports label stacking.

```
+------------------+
| Outer tunnel label|
+------------------+
| Inner service label|
+------------------+
| Original packet   |
+------------------+
```

The outer label can direct the packet through a tunnel. The inner label can identify a service or virtual circuit at the tunnel endpoint.

### MPLS advantages

- Supports traffic engineering.
- Supports VPN services.
- Enables label-based forwarding.
- Can aggregate forwarding treatment.
- Supports multiple transport technologies.
- Can support differentiated traffic classes.

**Important qualification:** MPLS does not automatically guarantee bandwidth, low delay or security. These outcomes depend on configuration, resource provisioning, admission control and the services built on top of MPLS.

### MPLS terminology and benefits are described in the source. Pasted text

---

## K. Destination-based forwarding

### Core idea

Destination-based forwarding chooses an outgoing interface based on the packet's destination address or a forwarding label associated with that destination.

The source explains how MPLS can replace a longest-prefix IP lookup at intermediate routers with an exact-match label lookup. Pasted text

### IP forwarding

An IP router generally uses longest-prefix matching.

For example:

|Prefix|Interface|
|---|---|
|18.1.1.0/24|Interface 1|
|18.1.0.0/16|Interface 2|
|0.0.0.0/0|Interface 3|

A destination matching multiple entries uses the most specific matching prefix.

### MPLS forwarding

MPLS uses a label lookup.

For example:

|Incoming label|Outgoing interface|Outgoing label|
|--:|---|--:|
|15|Interface 1|24|
|16|Interface 2|30|

A packet arriving with label 15 is forwarded using the corresponding label entry.

### Label distribution

The source describes Label Distribution Protocol $LDP$ as a mechanism through which routers advertise label bindings associated with prefixes.

Conceptually:

```
R2 allocates label 15 for prefix 18.1.1
              |
              v
R2 advertises label binding to R1
              |
              v
R1 stores label 15 as outgoing label
              |
              v
Packet arrives at R1 for 18.1.1.5
              |
              v
R1 attaches label 15
              |
              v
R2 receives label 15
              |
              v
R2 swaps label 15 for label 24
              |
              v
R3 receives packet
```

### Why exact-match forwarding matters

- IP forwarding may require longest-prefix matching.
- Label forwarding uses an exact label match.
- Exact-match lookup can be implemented efficiently.

**Important distinction:** MPLS does not necessarily change the underlying route selected by the IP routing protocol. In the source's example, the routing algorithm can still be OSPF; MPLS changes the forwarding mechanism used by intermediate devices.

---

## L. Explicit routing in MPLS

### Core idea

Explicit routing allows a network operator or control mechanism to direct traffic along a specified path rather than simply using the normal destination-based path.

### Why it is useful

Suppose two traffic sources must reach the same destination.

```
                 R3 ---- R6 ----+
                /                \
R1 ------------                  R7
                \                /
                 R3 ---- R4 -- R5
                /
R2 -------------
```

A network operator may want:

- Traffic from R1 to follow R1–R3–R6–R7.
- Traffic from R2 to follow R2–R3–R4–R5–R7.

This can distribute traffic across different paths.

### Why ordinary IP routing may not achieve this

Ordinary destination-based forwarding usually makes a decision based on the destination, not the source path by which the packet arrived.

MPLS can identify the two traffic groups as different FECs and associate them with different label-switched paths.

### Explicit routing with RSVP

The source explains that RSVP can be used to establish label-forwarding entries along an explicitly specified path. Pasted text

Conceptually:

```
Traffic classification
        |
        v
Select FEC
        |
        v
Choose explicit path
        |
        v
Signal path using RSVP
        |
        v
Install label entries
        |
        v
Forward using label swapping
```

### Traffic engineering

Explicit routing can help:

- Avoid congested links.
- Distribute traffic.
- Use available capacity more efficiently.
- Apply network policies.

The trade-off is additional control-plane complexity and the need to maintain path state.

---

## M. VPNs and tunnelling

### Core idea

A Virtual Private Network $VPN$ provides logical private connectivity over a shared network.

Tunnelling transports one packet or protocol inside another packet or protocol.

A VPN may use tunnelling and encryption, but **tunnelling alone does not guarantee confidentiality**.

### Packet encapsulation

A normal packet contains:

```
+---------------------+
| Original header     |
+---------------------+
| Original payload    |
+---------------------+
```

An encapsulated packet contains the original packet inside a new outer packet:

```
+--------------------------+
| Outer header             |
+--------------------------+
| Original header          |
+--------------------------+
| Original payload         |
+--------------------------+
```

### Encapsulation process

1. The tunnel entry point receives the original packet.
2. It adds an outer header.
3. The encapsulated packet travels across the intermediate network.
4. The tunnel endpoint receives the packet.
5. It removes the outer header.
6. It processes the original packet.

### Why tunnelling exists

Tunnelling can:

- Carry protocols across networks that do not natively support them.
- Connect remote networks.
- Create logical point-to-point links.
- Support VPN services.
- Carry private traffic across shared infrastructure.

### Types of VPN

|VPN type|Main purpose|
|---|---|
|Remote-access VPN|Connects an individual user to a private network|
|Site-to-site VPN|Connects two or more networks|
|Intranet VPN|Connects sites belonging to the same organization|
|Extranet VPN|Connects networks belonging to different organizations|
|Cloud VPN|Connects users or private networks to cloud resources|
|Mobile VPN|Maintains secure connectivity for mobile users|

### VPN protocols and tunnelling technologies

|Technology|Main function|Important point|
|---|---|---|
|IPsec|Secures IP communication|Supports transport and tunnel modes|
|L2TP|Establishes Layer 2 tunnels|Commonly paired with IPsec for encryption|
|PPTP|Older tunnelling protocol|Considered insecure; should not be selected for new deployments|
|TLS-based VPN|Secure remote access using TLS|Often provides application or browser-based access|
|OpenVPN|VPN software using TLS-based security|Flexible and widely supported|
|WireGuard|Modern VPN protocol|Designed for simplicity and efficient operation|
|GRE|Encapsulates network-layer protocols|Does not provide encryption by itself|
|IP-in-IP|Encapsulates an IP packet inside another IP packet|Does not encrypt traffic|
|SSH tunnelling|Forwards selected traffic through an encrypted SSH connection|Useful for specific application access|
|SSTP|Tunnelling over TLS|Associated with Microsoft systems|
|IKEv2|Key management and security association negotiation for IPsec|Often used with IPsec VPNs|

**Important correction:** PPTP should not be described as a secure modern VPN choice. L2TP itself does not provide strong encryption; L2TP is commonly combined with IPsec. SSL is obsolete; modern deployments use TLS.

### IPsec modes

**Transport mode**

- Protects the payload of the IP packet.
- Retains the original IP header.

**Tunnel mode**

- Encapsulates the original IP packet inside a new IP packet.
- Commonly used for gateway-to-gateway VPNs.

### Split tunnelling

Normally, all traffic may pass through the VPN. Split tunnelling allows selected traffic to use the VPN while other traffic uses the normal network connection.

```
             User device
                 |
          +------+------+
          |             |
          v             v
      VPN traffic    Public traffic
          |             |
          v             v
      VPN tunnel     Direct Internet
          |
          v
     Private network
```

**Trade-off:** Split tunnelling may improve performance and reduce VPN load, but it can create security and policy risks if traffic bypasses required inspection.

### GRE tunnelling

GRE (Generic Routing Encapsulation) encapsulates one network-layer protocol inside another.

GRE can provide a logical point-to-point connection across an IP network.

**GRE does not encrypt traffic.** It may be combined with IPsec when confidentiality and integrity are required.

### MPLS VPNs

MPLS can support Layer 2 and Layer 3 VPN services.

- **Layer 2 VPN:** Carries Layer 2 frames or services across an MPLS network.
- **Layer 3 VPN:** Provides logically separated IP routing services to different customers over shared provider infrastructure.

A provider can isolate customers' routing information even when customers use overlapping IP address ranges.

### VPN security distinction

```
TUNNELLING = Encapsulation and transport
ENCRYPTION = Confidentiality
AUTHENTICATION = Verifying identity
INTEGRITY = Detecting unauthorized modification
```

A secure VPN design must consider all relevant properties, not merely whether a tunnel exists.

---

## N. Network performance issues

The source identifies five common causes of poor network performance:

1. Bandwidth bottlenecks.
2. Interference.
3. Congestion.
4. Malware.
5. Outdated hardware or software.

### 1. Bandwidth bottlenecks

A bottleneck occurs when the available capacity of a link or network component is insufficient for the offered traffic.

Example:

- Available link capacity: 100 Mbit/s.
- Offered traffic: 140 Mbit/s.

The offered load exceeds the link's capacity.

$$
\text{Utilization} = \frac{\text{Offered traffic}}{\text{Available capacity}} \times 100\%
$$
$$
= \frac{140}{100}\times100\%
$$
$$
\boxed{140\%}
$$

This means the traffic demand exceeds the link capacity.

**Important:** A link cannot transmit 140 Mbit/s through a 100 Mbit/s physical capacity. Excess traffic must be queued, delayed, dropped or otherwise controlled.

### 2. Interference and interface-related issues

The source's discussion under “Interference” also describes interface-related issues such as:

- Incorrect interface configuration.
- Damaged connectors.
- Faulty network hardware.
- Incompatible interface software.

These are related but not identical problems. Wireless interference is a signal-quality issue; interface misconfiguration or hardware failure is a device-connectivity issue.

### 3. Congestion

Congestion occurs when many devices or flows compete for limited network resources.

Symptoms include:

- Slow response times.
- Packet drops.
- Delayed connections.
- Reduced throughput.

### 4. Malware

Malware can affect network performance by:

- Consuming CPU and memory.
- Generating unwanted traffic.
- Disrupting network communication.
- Spreading across devices.

### 5. Outdated hardware or software

Examples include:

- Faulty network interfaces.
- Insufficient memory or processing power.
- Incompatible devices.
- Outdated drivers.
- Software bugs.
- Inefficient network applications.

### Performance diagnosis table

|Symptom|Possible cause|Useful investigation|
|---|---|---|
|Slow transfers during busy periods|Congestion|Measure utilization and traffic volume|
|Low throughput on one link|Bottleneck or faulty interface|Check link capacity, errors and interface counters|
|Unstable wireless connection|Radio interference|Inspect signal quality and channel conditions|
|Unexpected traffic spikes|Malware or misconfiguration|Review traffic patterns and endpoint security|
|Frequent disconnections|Hardware or software failure|Check logs, drivers and physical interfaces|
|High delay but low link utilization|Routing, queuing or endpoint issue|Measure latency at multiple network points|

### Diagnostic flowchart

```
          Network performance problem
                      |
                      v
              Check connectivity
                      |
                      v
            Check interface status
                      |
                      v
          Measure bandwidth / latency
                      |
          +-----------+-----------+
          |                       |
     High utilization        Low utilization
          |                       |
          v                       v
       Congestion          Check routing,
       or bottleneck       errors and endpoints
          |                       |
          v                       v
   Inspect traffic          Check hardware,
   and queue behaviour      software and malware
          |                       |
          +-----------+-----------+
                      |
                      v
              Apply correction
                      |
                      v
              Measure again
```

---

## O. Delay-Tolerant Networking $DTN$

### Core idea

Delay-Tolerant Networking is designed for networks where continuous end-to-end connectivity cannot be assumed.

Examples include:

- Space communication.
- Remote or isolated areas.
- Intermittently connected mobile networks.
- Networks with sparse nodes.
- Environments where wireless links are frequently disrupted.

Traditional routing often assumes that a complete path can be established before data is sent.

DTN does not require a continuous end-to-end path.

### Traditional routing versus DTN

**Traditional routing:**

```
Source ---- R1 ---- R2 ---- R3 ---- Destination

A complete route is established.
Data is forwarded across the route.
```

**DTN routing:**

```
Source
  |
  v
Node A stores message
  |
  | Contact becomes available
  v
Node B stores message
  |
  | Another contact becomes available
  v
Node C stores message
  |
  v
Destination
```

### Store-and-forward mechanism

1. A node receives a message.
2. It stores the message locally.
3. It waits for a suitable forwarding opportunity.
4. When another node becomes reachable, it forwards the message.
5. The receiving node stores it.
6. The process repeats until delivery or expiration.

### Why ordinary ad hoc routing can fail

Protocols such as AODV and DSR generally attempt to establish a route before forwarding data.

If no continuous end-to-end route exists, route discovery may fail.

DTN instead uses store-and-forward operation.

### Message replication

A DTN may replicate messages to increase the probability of delivery.

However, replication consumes:

- Storage.
- Network bandwidth.
- Processing resources.

Replication is therefore useful only when its delivery benefits justify its resource cost.

### Bundle protocol

DTN uses bundles to carry application data across different underlying network technologies.

The source describes the Bundle Protocol as an overlay architecture using Endpoint Identifiers (EIDs) and convergence layers. It also lists bulk, normal and expedited service markings.

```
Application data
       |
       v
  Bundle creation
       |
       v
 Bundle forwarding
       |
       v
Convergence layer
       |
       v
Local network transport
       |
       v
Next DTN node
```

### Bundle convergence layer

A convergence layer adapts bundle communication to the underlying transport network.

This allows DTN to operate across heterogeneous networks, including IP and non-IP transport technologies.

### Security issues in DTN

Security is difficult because:

- Nodes may not be continuously reachable.
- End-to-end key exchange may be delayed.
- Devices may only be intermittently visible.
- Authentication and privacy must be maintained despite interruptions.

The source identifies approaches including identity-based encryption, distributed certificate authorities and tamper-evident tables with gossiping protocols.

**Central insight:** DTN changes the assumption that communication must happen through a continuously available end-to-end path. It treats storage and future contact opportunities as part of the routing system.

---

# 2. PRACTICAL APPLICATION — TURN KNOWLEDGE INTO ABILITY

## A. WHEN should I use each concept?

|Concept|Use it when…|Avoid relying on it when…|
|---|---|---|
|QoS routing|Traffic needs a path meeting performance constraints|Network-state information is unreliable|
|IntServ|Individual flows require controlled resource reservations|The network has too many flows for per-flow state|
|RSVP|A flow needs signalling and resource reservation|The path does not support the required reservation mechanisms|
|DiffServ|A large network needs scalable traffic classification|You need a hard guarantee without additional controls|
|MPLS|Traffic engineering, label-based forwarding or provider VPNs are required|Ordinary IP forwarding is sufficient|
|Explicit routing|Different traffic groups need different paths|The operational complexity outweighs the benefit|
|VPN|Users or sites need private connectivity over shared infrastructure|The VPN endpoint or security configuration cannot be trusted|
|GRE|A logical tunnel is needed for protocol encapsulation|Encryption is required but no separate security mechanism is provided|
|DTN|Connectivity is intermittent or end-to-end paths are unavailable|Immediate real-time delivery is essential|

### Practical decision rules

- Need **per-flow resource reservation**? Consider IntServ with RSVP.
- Need **scalable class-based traffic treatment**? Consider DiffServ.
- Need **label-based forwarding and traffic engineering**? Consider MPLS.
- Need **secure communication across a shared network**? Consider an appropriately secured VPN.
- Need **communication despite intermittent connectivity**? Consider DTN.

These are starting points, not universal rules. Actual selection depends on topology, application requirements, available equipment, operational expertise and service objectives.

---

## B. WHERE are these concepts used?

|Application|Relevant concept|Problem solved|Required inputs|Expected outcome|
|---|---|---|---|---|
|Enterprise voice network|QoS, DiffServ|Voice quality deteriorates during congestion|Voice traffic classification and network capacity|Preferential voice treatment|
|Service provider backbone|DiffServ, MPLS|Large-scale traffic needs consistent treatment|Traffic classes, policies and topology|Scalable traffic forwarding|
|Enterprise WAN|VPN, MPLS VPN|Multiple sites need private connectivity|Site addressing, routing and security policies|Logical connectivity between sites|
|Resource-controlled network|IntServ, RSVP|Specific flows need reservations|Flow specifications and available resources|Admission-controlled service|
|Network traffic engineering|MPLS explicit routing|Some links are congested while alternatives are underused|Traffic demand and network topology|Traffic distributed across selected paths|
|Satellite or remote network|DTN|Continuous connectivity is unavailable|Storage, contact opportunities and message information|Delayed but eventual delivery|
|Network operations centre|Performance monitoring|Users report slow or unreliable communication|Counters, logs and performance measurements|Diagnosis and corrective action|

---

## C. WHY choose one method over another?

### IntServ versus DiffServ

|Dimension|IntServ|DiffServ|
|---|---|---|
|Control|Individual flows|Traffic aggregates|
|State requirements|High at large scale|Lower in the core|
|Signalling|Required for reservations|Usually limited|
|Precision|Fine-grained|Class-based|
|Deployment complexity|Per-flow coordination|Significant provisioning and policy configuration|
|Scalability|More challenging|Generally better|
|Main advantage|Quantitative resource control|Efficient aggregate treatment|
|Main limitation|Per-flow state overhead|Class treatment alone does not guarantee end-to-end performance|

**Decision:** Use IntServ-style reservation when individual flow requirements justify the cost of maintaining flow state. Use DiffServ when scalable aggregate treatment is more important.

### MPLS versus ordinary IP forwarding

|Dimension|Ordinary IP forwarding|MPLS forwarding|
|---|---|---|
|Forwarding identifier|Destination IP address|MPLS label|
|Lookup|Longest-prefix match|Exact label match|
|Path control|Routing protocol decisions|Can support explicit label-switched paths|
|Traffic engineering|Depends on routing and related mechanisms|Explicit paths and label-based control|
|VPN support|Possible using other technologies|Supports provider Layer 2 and Layer 3 VPN services|
|Operational complexity|Often simpler|Requires MPLS control and forwarding configuration|

**Decision:** MPLS is valuable when label-based services, traffic engineering or provider VPN capabilities justify its additional complexity. It should not be assumed to be inherently faster than modern hardware-based IP forwarding.

### VPN technology selection

|Requirement|Suitable technology to investigate|Key consideration|
|---|---|---|
|Site-to-site secure connectivity|IPsec tunnel mode|Gateway configuration and key management|
|Remote employee access|TLS-based VPN or IPsec|Identity, device security and access control|
|Logical protocol tunnel|GRE|Add encryption separately if needed|
|Application-specific forwarding|SSH tunnelling|Restrict permitted ports and destinations|
|Modern general-purpose VPN|WireGuard or OpenVPN|Security configuration and operational support|

---

## D. HOW should I solve an unfamiliar networking problem?

Use this repeatable workflow.

```
          Define the Problem
                  |
                  v
         Identify the Objective
                  |
                  v
       Inspect Inputs and Constraints
                  |
                  v
            Check Assumptions
                  |
                  v
           Establish a Baseline
                  |
                  v
       Select an Appropriate Method
                  |
                  v
          Apply or Implement It
                  |
                  v
          Evaluate the Result
                  |
                  v
          Interpret the Evidence
                  |
                  v
        Make a Defensible Decision
                  |
                  v
             Monitor and Improve
```

### What evidence is needed at each stage?

|Stage|What to do|Evidence required|
|---|---|---|
|Define the problem|Describe the observed failure or requirement|User reports, system symptoms|
|Identify the objective|Define what successful performance means|Delay, throughput, loss or availability targets|
|Inspect inputs|Examine topology, devices and traffic|Network diagrams and configurations|
|Check assumptions|Verify capacity, routing and compatibility|Measurements and configuration checks|
|Establish baseline|Record normal performance|Throughput, latency, loss and utilization|
|Select method|Compare possible solutions|Requirements and constraints|
|Implement|Apply the selected configuration|Configuration records|
|Evaluate|Compare actual and expected results|Repeated measurements|
|Interpret|Identify what caused the result|Evidence from multiple network points|
|Decide|Accept, modify or reject the solution|Verified performance|
|Monitor|Detect changes and regressions|Continuous monitoring and alerts|

---

## E. WHAT does implementation look like?

The following tools are examples of practical networking environments. They are not all explicitly prescribed by the source material.

### Useful software and tools

|Tool|Practical purpose|
|---|---|
|Wireshark|Inspect packets and protocol behaviour|
|Cisco Packet Tracer|Simulate basic network configurations|
|GNS3|Build virtual network topologies|
|EVE-NG|Emulate network devices and topologies|
|Linux `ip`|Inspect and configure network interfaces and routes|
|Linux `ping`|Test reachability and measure round-trip time|
|Linux `traceroute`|Investigate network paths|
|Linux `iperf3`|Measure network throughput|
|`tcpdump`|Capture packets from network interfaces|

### Example 1: Inspecting network connectivity

```
ip addr
```

Shows configured network interfaces and IP addresses.

```
ip route
```

Displays the routing table.

```
ping -c 5 8.8.8.8
```

Sends five ICMP echo requests to test reachability and measure round-trip time.

```
traceroute 8.8.8.8
```

Attempts to show the routers along a path.

### Example 2: Measuring throughput

On one machine, start an iperf3 server:

```
iperf3 -s
```

On another machine, run:

```
iperf3 -c SERVER_IP
```

Replace `SERVER_IP` with the actual server address.

The client reports throughput achieved during the test.

**Verification:** Repeat the test, examine both directions where appropriate, and compare results with the capacity of the network interfaces and links.

### Example 3: Inspecting packet markings

Use Wireshark to inspect the IP header's DS field.

Look for:

- DSCP value.
- ECN bits.
- Source and destination addresses.
- Protocol type.
- Packet timing.

This can help verify whether traffic classification and marking are occurring as expected.

### Educational versus professional implementation

An educational simulation may demonstrate that a packet receives a particular priority.

A professional implementation must additionally consider:

- Whether all network devices interpret the marking consistently.
- Whether the queues are correctly provisioned.
- Whether traffic policing is configured.
- Whether the network has enough capacity.
- Whether performance targets are actually met.
- Whether monitoring and change control are available.

---

## F. HOW do I know whether the method worked?

### Important metrics

**1. Link utilization**

$$
U = \frac{R_{\text{used}}}{R_{\text{capacity}}}\times100\%
$$

Where:

- $U$ = link utilization (%).
- $R_{\text{used}}$ = measured traffic rate (bit/s).
- $R_{\text{capacity}}$ = link capacity (bit/s).

**Example**

A 100 Mbit/s link carries 65 Mbit/s.

$$
U = \frac{65}{100}\times100
$$
$$
\boxed{U=65\%}
$$

Interpretation: 65% of the link's nominal capacity is being used.

This does not by itself prove that the network is performing well. Delay, loss, bursts and application requirements must also be considered.

**2. Throughput**

$$
T = \frac{\text{Successfully delivered data}}{\text{Measurement time}}
$$

If 500 MB of useful data is delivered in 50 seconds:

$$
T = \frac{500}{50}=10\text{ MB/s}
$$

In bits per second:

$$
10\times8 = 80\text{ Mbit/s}
$$

**3. Packet loss**

$$
L = \frac{N_{\text{sent}}-N_{\text{received}}} {N_{\text{sent}}}\times100\%
$$

If 1,000 packets are sent and 990 arrive:

$$
L = \frac{1000-990}{1000}\times100
$$
$$
\boxed{L=1\%}
$$

**4. Round-trip time**

RTT measures the time required for a packet to travel to a destination and for a response to return.

It is not identical to one-way latency.

**5. Jitter**

Jitter describes variation in packet delay. The exact calculation depends on the measurement method.

### Evaluation checklist

- Does the solution satisfy the stated performance objective?
- Is the result repeatable?
- Are measurements taken during representative traffic conditions?
- Has packet loss been checked?
- Is the routing path correct?
- Are interface errors present?
- Are the service markings preserved?
- Are the assumptions still valid under peak traffic?

---

## G. WHAT if the method fails?

### QoS and networking troubleshooting

|Symptom|Possible cause|Diagnostic action|Corrective direction|
|---|---|---|---|
|High latency|Congestion or poor routing|Compare latency across network segments|Adjust routing or capacity|
|High packet loss|Queue overflow or faulty link|Inspect interface counters and queue drops|Correct bottleneck or configuration|
|Voice quality problems|Delay, jitter or packet loss|Measure real-time traffic performance|Review prioritization and available capacity|
|RSVP reservation rejected|Insufficient resources or policy restrictions|Inspect admission-control decisions|Reassess requirements or capacity|
|DiffServ marking ignored|Incorrect classification or policy|Inspect DSCP values at multiple points|Correct marking and PHB configuration|
|MPLS traffic misrouted|Incorrect label binding or forwarding entry|Inspect label tables and LSP state|Correct label distribution or path configuration|
|VPN cannot connect|Authentication, routing or firewall problem|Check tunnel status, logs and security associations|Correct endpoint and policy configuration|
|DTN messages not delivered|No forwarding opportunity or insufficient storage|Inspect contact and bundle state|Adjust scheduling or storage policy|

### Diagnostic principles

**Do not change several settings simultaneously.**

A better troubleshooting process is:

1. Observe the problem.
2. Establish a measurable baseline.
3. Form a possible explanation.
4. Run a test that distinguishes that explanation from alternatives.
5. Apply one controlled correction.
6. Repeat the measurement.
7. Record the outcome.

---

## H. HOW does performance change under different conditions?

|Condition|Expected behaviour|Engineering response|
|---|---|---|
|Low traffic volume|Queues may remain mostly empty|Avoid unnecessary complexity|
|High traffic volume|Congestion and queuing delay may increase|Review capacity and scheduling|
|Bursty traffic|Short-term queue overflow may occur|Consider shaping and buffer management|
|Frequent routing changes|Resource assumptions may become invalid|Monitor path and resource state|
|Many individual flows|IntServ state requirements increase|Consider aggregation|
|Many classes|DiffServ provisioning becomes more complex|Keep class design manageable|
|Intermittent connectivity|Conventional end-to-end routing may fail|Consider DTN|
|Limited storage|DTN replication becomes expensive|Use selective forwarding|

---

## I. REAL-WORLD CASE STUDY

### Hypothetical case: Improving voice and data performance in a multi-branch organization

**This case study is illustrative. The numerical values are hypothetical, not measured research findings.**

### 1. Problem

A company operates a headquarters and three branch offices.

Employees report:

- Voice calls become unclear during large file transfers.
- Video meetings occasionally freeze.
- File transfers consume a large share of available bandwidth.

### 2. Available information

Assume:

- Each branch connects to headquarters through a 100 Mbit/s WAN link.
- Voice traffic requires low delay and low jitter.
- Video meetings need consistent bandwidth.
- File transfers can tolerate delay.
- The organization already uses IP routing.

### 3. Method selection

Possible approaches:

|Method|Benefit|Limitation|
|---|---|---|
|Increase bandwidth|Provides more capacity|Does not automatically prioritize traffic|
|IntServ|Supports flow-level resource reservations|Per-flow signalling and state|
|DiffServ|Classifies voice, video and data|Requires suitable provisioning|
|MPLS|Can support controlled paths and VPN services|Adds configuration complexity|

**Decision:** Use DiffServ as the primary class-based traffic-treatment mechanism. Consider MPLS only if the organization also needs provider traffic engineering or MPLS VPN services.

### 4. Step-by-step solution

**Step 1 — Classify traffic**

|Traffic|Class|
|---|---|
|Voice|Real-time|
|Video meetings|Interactive|
|Business applications|Standard|
|Bulk file transfers|Background|

**Step 2 — Apply marking**

The network marks packets according to the agreed class policy.

**Step 3 — Configure queues**

The network devices are configured to provide suitable treatment for the classes.

**Step 4 — Check bandwidth**

The network team checks whether the available WAN capacity can handle expected peak traffic.

**Step 5 — Monitor**

The team measures delay, jitter, packet loss and throughput for each relevant traffic class.

### 5. Visual workflow

```
Branch traffic
      |
      v
Ingress router
      |
      v
Traffic classification
      |
      +--------+----------+-----------+
      |        |          |           |
      v        v          v           v
     Voice   Video     Business     Bulk
      |        |          |           |
      v        v          v           v
   Priority  Preferred  Standard   Background
      |        |          |           |
      +--------+----------+-----------+
                       |
                       v
                 WAN forwarding
                       |
                       v
                   Headquarters
```

### 6. Evaluation

Assume the following hypothetical results:

|Metric|Before|After|
|---|--:|--:|
|Average voice delay|150 ms|80 ms|
|Voice jitter|35 ms|12 ms|
|Voice packet loss|2.0%|0.5%|
|WAN throughput|90 Mbit/s|90 Mbit/s|

These values illustrate a possible result, not a guaranteed outcome of DiffServ.

The total throughput remains the same, while the distribution and treatment of traffic have changed.

### 7. Professional decision

The engineer should accept the configuration only if:

- Measurements are repeatable.
- Performance remains acceptable during peak periods.
- Traffic classification is correct.
- Higher-priority traffic is not starving other important traffic.
- Monitoring confirms that the agreed service objectives are met.

### 8. Failure analysis

If voice quality remains poor, possible causes include:

- Incorrect DSCP marking.
- Queue configuration errors.
- Insufficient capacity.
- Congestion elsewhere in the path.
- Wireless interference at the branch.
- Endpoint or application problems.

The engineer should not assume that QoS configuration is the only possible cause.

### 9. Transfer to new problems

The same approach applies to:

- Online learning platforms.
- Hospital communication systems.
- Enterprise video conferencing.
- Cloud application access.
- Industrial communication networks.

The transferable principle is to classify traffic according to actual application requirements, then measure whether the network delivers the intended service.

---

## J. WHAT does competence look like?

|Level|Expected ability|
|---|---|
|Conceptual understanding|Explain QoS, IntServ, DiffServ, MPLS, VPNs and DTN|
|Guided application|Trace RSVP, configure basic network tests and interpret packet markings|
|Independent application|Select suitable QoS and forwarding mechanisms for a given topology|
|Professional judgment|Evaluate trade-offs, diagnose failures, assess uncertainty and justify a network design|

---

# 3. EXPERT INSIGHT — THINK LIKE A SPECIALIST

## A. Recognize the problem

Experienced network engineers do not begin by choosing a protocol.

They first identify the actual performance problem.

|Observation|What an expert investigates|
|---|---|
|Voice is unclear|Delay, jitter, loss and queue behaviour|
|File transfers are slow|Throughput, capacity and congestion|
|Some applications perform better than others|Classification and scheduling|
|Traffic follows an undesirable path|Routing and traffic engineering|
|Remote sites cannot communicate securely|VPN and tunnel configuration|
|A connection is unavailable intermittently|Contact patterns and DTN suitability|

**Expert principle:** Diagnose the bottleneck before selecting the technology.

---

## B. Check assumptions

|Assumption|How to test it|Consequence if false|
|---|---|---|
|Sufficient bandwidth is available|Measure utilization|Reservations may fail|
|Network paths are stable|Monitor routing changes|Resource assumptions may become invalid|
|DSCP markings are preserved|Capture packets at multiple points|Intended traffic classes may be lost|
|Every router supports the required QoS behaviour|Inspect device capabilities and configuration|End-to-end treatment may not be consistent|
|VPN encryption is active|Inspect security associations and configuration|Tunnel may not provide confidentiality|
|DTN nodes have enough storage|Monitor storage availability|Messages may be discarded|

### Essential versus relaxable assumptions

**Essential for a particular guarantee:** Every relevant bottleneck and network domain must support the service conditions required for that guarantee.

**Potentially relaxable:** The network need not use the same physical device or vendor at every point, provided the relevant interfaces and behaviours interoperate correctly.

---

## C. Select the method

### QoS architecture decision tree

```
       Does the application need QoS?
                    |
             +------+------+
             |             |
            No            Yes
             |             |
       Best effort      Need per-flow
                         reservation?
                             |
                       +-----+-----+
                       |           |
                      Yes          No
                       |           |
                    IntServ     Need class-based
                    + RSVP      scalability?
                                    |
                               +----+----+
                               |         |
                              Yes        No
                               |         |
                            DiffServ  Reassess
```

This is a simplified selection guide. Real network architectures may combine multiple approaches.

### Practical method-selection factors

Experts compare:

- Service requirements.
- Available bandwidth.
- Number of flows.
- Network topology.
- Number of administrative domains.
- Hardware and software capabilities.
- Operational complexity.
- Security requirements.
- Monitoring capability.
- Failure recovery.

---

## D. Avoid common mistakes

|Mistake|Why it occurs|Why it is incorrect|Prevention|
|---|---|---|---|
|Treating bandwidth as throughput|Both are measured in bit/s|Actual throughput is affected by protocol overhead, loss and congestion|Measure achieved throughput|
|Assuming shortest path is best|Short paths seem efficient|Shortest path may be congested|Evaluate QoS metrics|
|Assuming QoS routing guarantees QoS|Confusing path selection with resource allocation|A selected path may not reserve capacity|Include admission control and reservation where needed|
|Confusing IntServ and ISDN|Similar names|They describe different technologies|Memorize their full forms and purposes|
|Assuming DiffServ guarantees bandwidth|Confusing class priority with reservation|Aggregated class bandwidth is shared|Examine provisioning and reservation requirements|
|Assuming MPLS encrypts packets|Confusing VPN separation with encryption|MPLS labels do not encrypt payloads|Use suitable security mechanisms|
|Assuming GRE is secure|Confusing encapsulation with encryption|GRE alone does not provide confidentiality|Combine with an appropriate security protocol|
|Treating every VPN protocol as equally secure|Memorizing protocol names|Protocols differ in security and support|Evaluate current protocol security|
|Assuming DTN provides instant delivery|Applying ordinary network expectations|DTN may wait for future contacts|Evaluate delivery delay and contact opportunities|

---

## E. Understand subtle limitations

### 1. QoS is not unlimited capacity

Prioritization does not create bandwidth. If the total offered load persistently exceeds the available capacity, some traffic must be delayed, dropped or constrained.

### 2. DiffServ is not automatically end-to-end QoS

Different network domains may have different traffic policies. A class marking alone does not ensure that every provider applies the same service.

### 3. MPLS is not synonymous with guaranteed bandwidth

MPLS provides label-based forwarding and supports traffic engineering. Actual bandwidth guarantees depend on resource allocation, admission control and provisioning.

### 4. VPN does not automatically mean anonymity

A VPN can protect traffic between endpoints, but it does not guarantee that a user is anonymous to every service or observer.

### 5. DTN may improve delivery probability at the cost of resource consumption

Replication can improve the probability of successful delivery, but excessive replication can exhaust storage and network resources.

### 6. A good average result can conceal bad peak performance

A network might show acceptable average latency while experiencing severe delay during short periods of congestion.

Professional evaluation therefore examines distributions and peak conditions, not just averages.

---

## F. Verify results independently

Use these checks before accepting a network design.

### 1. Dimensional analysis

For utilization:

$$
U = \frac{\text{bit/s}}{\text{bit/s}}\times100\%
$$

The units cancel, leaving a percentage.

### 2. Boundary cases

- At zero offered traffic, utilization should be approximately zero.
- When offered traffic approaches capacity, queues may increase.
- When offered traffic exceeds capacity for long enough, congestion becomes unavoidable unless traffic is controlled.

### 3. Independent calculations

If a 1 Gbit/s link carries 750 Mbit/s:

$$
U = \frac{750}{1000}\times100 =75\%
$$

Check the result against interface counters.

### 4. Packet-level verification

Capture traffic before and after a QoS boundary to determine whether:

- DSCP markings are applied.
- Encapsulation is correct.
- Packets follow the expected route.
- Tunnel headers are removed at the appropriate endpoint.

### 5. Sensitivity analysis

Test how performance changes when:

- Traffic volume increases.
- The number of flows increases.
- One link fails.
- Routing changes.
- A traffic class becomes overloaded.

---

## G. Separate evidence from interpretation

|Statement|Category|
|---|---|
|An MPLS label stack entry contains 32 bits|Protocol fact|
|A 100 Mbit/s link carrying 50 Mbit/s has 50% utilization|Mathematical result|
|A particular queue configuration will improve voice quality|Engineering prediction requiring testing|
|DiffServ is generally more scalable than per-flow IntServ in large backbones|Architectural comparison|
|A particular company should deploy MPLS|Context-dependent recommendation|
|A VPN makes all Internet activity anonymous|Incorrect generalization|

### Historical and technical context

The uploaded material includes technologies and descriptions from different periods. In particular:

- ISDN is mainly of historical and educational importance in contemporary access-network discussions.
- MPLS remains relevant, but modern hardware has changed the performance comparison with conventional IP routing.
- VPN protocols have different security properties; older protocols such as PPTP should not be treated as modern secure choices.
- DiffServ codepoint details should be understood using the six-bit DSCP field, not the simplified 256-level description.

These clarifications help preserve the syllabus content without treating every historical description as a current deployment recommendation.

---

## H. Know when to stop

A network engineer should stop investigating when:

- The root cause is supported by repeatable evidence.
- The corrective change has been verified.
- Performance meets the agreed acceptance criteria.
- No new risk is introduced by the correction.
- Monitoring can detect future regression.

Further investigation is appropriate when:

- Results are inconsistent.
- The cause is not isolated.
- Security controls may be affected.
- The network has safety-critical or regulated functions.
- A change may affect other customers or administrative domains.

Professional decisions should be documented, reversible where practical, and consistent with the organization's security and change-management policies.

---

## I. Compare related concepts

### 1. IntServ versus DiffServ

|Dimension|IntServ|DiffServ|
|---|---|---|
|Fundamental idea|Reserve resources for flows|Group flows into classes|
|Mechanism|Signalling and admission control|Classification, marking and PHB|
|Assumptions|Routers support the required reservation functions|Network devices apply compatible class policies|
|Inputs|Flow requirements|Traffic profiles and class policies|
|Strengths|Fine-grained control|Scalability|
|Limitations|Per-flow state overhead|Class-level treatment may not give quantitative guarantees|
|Interpretability|Reservation status is flow-specific|Treatment depends on class configuration|
|Operational cost|Signalling and state management|Provisioning and traffic engineering|
|Best fit|Controlled environments|Large networks and backbones|
|Failure modes|Reservation rejection, missing support|Incorrect marking, congestion, inconsistent provisioning|

### 2. MPLS versus VPN tunnelling

|Dimension|MPLS|VPN tunnelling|
|---|---|---|
|Fundamental idea|Forward packets using labels|Encapsulate traffic across a network|
|Mechanism|Label push, swap and pop|Outer tunnel headers and tunnel endpoints|
|Assumptions|MPLS-capable network|Compatible tunnel endpoints|
|Inputs|FECs, labels and forwarding information|Original packets and tunnel configuration|
|Strengths|Traffic engineering and provider services|Secure or logical connectivity, depending on protocol|
|Limitations|Operational complexity|Encapsulation overhead and security configuration|
|Interpretability|Label tables and LSP state|Tunnel and security-association state|
|Computational cost|Depends on forwarding and control architecture|Depends on tunnel protocol and encryption|
|Best fit|Provider backbones and MPLS VPNs|Remote access and site-to-site connectivity|
|Failure modes|Label or LSP problems|Authentication, routing or tunnel failure|

### 3. Traditional routing versus DTN

|Dimension|Traditional routing|DTN|
|---|---|---|
|Fundamental idea|Forward data over available routes|Store data until forwarding opportunities arise|
|Mechanism|Route establishment and packet forwarding|Store-and-forward bundles|
|Assumptions|Sufficient connectivity for route operation|Intermittent contact is expected|
|Inputs|Destination and routing information|Bundles, EIDs and contact opportunities|
|Strengths|Low delivery delay when connected|Works despite interruptions|
|Limitations|Fails when no usable route exists|Potentially long delivery times|
|Interpretability|Routing tables|Bundle and contact state|
|Resource requirements|Routing and forwarding resources|Additional storage and scheduling|
|Best fit|Connected IP networks|Remote, mobile or space networks|
|Failure modes|Route failure and congestion|Storage exhaustion and missed contacts|

---

# 4. MEMORY ANCHOR — MAKE KNOWLEDGE RECONSTRUCTABLE

### One sentence

**Internetwork QoS is the coordinated management of traffic paths, resources, packet treatment and network policies to provide suitable performance under real network constraints.**

### Three essential points

1. **QoS architecture:** Control Plane selects paths and manages reservations; Data Plane treats packets; Management Plane defines and monitors policies.
2. **QoS implementation:** IntServ reserves resources for flows, DiffServ treats traffic aggregates, and MPLS forwards using labels.
3. **Network behaviour:** VPN tunnelling supports logical connectivity, performance engineering addresses congestion and bottlenecks, and DTN supports communication despite intermittent connectivity.

### One misconception

**Misconception:** Giving a packet a high-priority marking guarantees low delay and zero packet loss across the Internet.

**Correction:** Actual service depends on the configuration, resources and behaviour of every relevant network segment.

### One practical decision rule

Choose the architecture according to the required granularity of control, network scale, connectivity conditions and security requirements.

### One visual summary

```
                  QoS
                   |
       +-----------+-----------+
       |           |           |
     Control      Data     Management
       |           |           |
     Routing    Queuing       SLA
   Reservation  Marking      Policy
       |           |
       +-----+-----+
             |
      QoS ARCHITECTURES
             |
       +-----+------+
       |     |      |
    IntServ DiffServ MPLS
       |     |      |
     Flows Classes Labels
             |
       NETWORK SERVICES
             |
       +-----+------+
       |            |
      VPN          DTN
    Tunnelling   Store-forward
```

### One transfer principle

The same reasoning used in QoS applies to other resource-constrained systems: identify competing demands, define service requirements, allocate resources, monitor outcomes and adjust the system when evidence shows that assumptions are no longer valid.

---

# 5. EXAMINATION AND APPLICATION READINESS

## A. Examination-relevant understanding

|Topic|What to master|Likely examination task|
|---|---|---|
|QoS planes|Control, Data and Management|Explain and draw the architecture|
|QoS routing|Metrics, constraints and reservation|Explain path selection|
|IntServ|Three service classes and per-flow reservations|Compare service classes|
|ISDN|BRI, PRI, channel structure|Numerical calculations|
|RSVP|PATH, RESV and soft state|Draw and explain message flow|
|DiffServ|DSCP, PHB and aggregation|Explain architecture|
|IntServ versus DiffServ|Granularity and scalability|Comparison question|
|MPLS|LER, LSR, LSP, FEC and label operations|Draw packet forwarding|
|Destination-based forwarding|Prefix lookup and label lookup|Trace forwarding decisions|
|Explicit routing|Specified paths and traffic engineering|Explain FEC-based path control|
|VPN and tunnelling|Encapsulation, VPN types and protocols|Draw tunnel architecture|
|Network performance|Bottlenecks, congestion and interference|Diagnose a scenario|
|DTN|Store-and-forward and bundles|Explain intermittent-network routing|

### Essential equations

**BRI rate**

$$
R_{\text{BRI}}=2(64)+16=144\text{ kbit/s}
$$

Including the source's stated overhead:

$$
R_{\text{required}}=144+48=192\text{ kbit/s}
$$

**PRI rate**

$$
R_{\text{PRI}}=23(64)+64=1536\text{ kbit/s}
$$

Including the source's stated overhead:

$$
R_{\text{required}}=1536+8=1544\text{ kbit/s}
$$

**MPLS label entry**

$$
20+3+1+8=32\text{ bits}
$$

**Link utilization**

$$
U=\frac{\text{Used bandwidth}}{\text{Capacity}}\times100\%
$$

**Packet loss**

$$
L=\frac{\text{Packets sent}-\text{Packets received}} {\text{Packets sent}}\times100\%
$$

---

## B. Common examination traps

|Mistake|Why it is wrong|How to avoid it|
|---|---|---|
|Saying QoS routing guarantees performance|It selects a feasible path but does not itself reserve resources|Mention resource reservation|
|Reversing PATH and RESV|RSVP uses sender-to-receiver PATH and receiver-to-sender RESV|Draw the arrows|
|Saying IntServ uses traffic classes only|IntServ is associated with flow-level reservation|Explain per-flow state|
|Saying DiffServ reserves resources for every flow|DiffServ aggregates flows into classes|Explain class-based treatment|
|Confusing IntServ and ISDN|They are unrelated concepts|Write their full forms|
|Calling BRI 192 kbit/s of user-channel capacity|192 includes the overhead stated by the source|Separate 144 kbit/s channel total from 192 kbit/s required pipe|
|Calling every PRI 23B + D|The source recognizes regional configurations|State the regional assumption|
|Saying MPLS encrypts data|Labels do not encrypt packet payloads|Distinguish forwarding from security|
|Confusing LER and LSR|LER operates at the edge; LSR switches labels|Draw ingress, core and egress|
|Saying GRE encrypts data|GRE encapsulates but does not encrypt|State the need for separate security|
|Saying all VPNs are the same|VPN architectures and protocols differ|Identify the VPN type|
|Assuming DTN requires a continuous path|DTN is designed for disrupted connectivity|Explain store-and-forward|
|Treating bandwidth as throughput|Capacity is not the same as achieved data rate|Define both terms|

---

## C. Worked problem-solving examples

### Example 1 — Calculate BRI capacity

**Problem:** Calculate the BRI channel rate and the required digital pipe using the overhead specified in the source.

**Given:**

- Two B-channels at 64 kbit/s each.
- One D-channel at 16 kbit/s.
- Overhead of 48 kbit/s.

**Required:** Total channel rate and required pipe capacity.

**Method:**

$$
R=2B+D
$$

Substitute:

$$
R=2(64)+16
$$
$$
R=128+16
$$
$$
\boxed{R=144\text{ kbit/s}}
$$

Add overhead:

$$
R_{\text{pipe}}=144+48
$$
$$
\boxed{R_{\text{pipe}}=192\text{ kbit/s}}
$$

**Interpretation:** The channels carry 144 kbit/s in total, while the source specifies a 192 kbit/s digital pipe including overhead.

**Verification:** Two 64 kbit/s channels give 128 kbit/s. Adding the 16 kbit/s D-channel gives 144 kbit/s.

**Common mistake:** Reporting 192 kbit/s as the sum of the B- and D-channels.

---

### Example 2 — Calculate PRI capacity

**Problem:** Calculate the PRI capacity for the 23B + D configuration.

**Given:**

- 23 B-channels at 64 kbit/s.
- One D-channel at 64 kbit/s.
- 8 kbit/s overhead.

**Required:** Total channel capacity and required pipe.

**Calculation:**

$$
R=23(64)+64
$$
$$
R=1472+64
$$
$$
\boxed{R=1536\text{ kbit/s}}
$$

Including overhead:

$$
R_{\text{pipe}}=1536+8
$$
$$
\boxed{R_{\text{pipe}}=1544\text{ kbit/s}}
$$

**Interpretation:** The resulting digital pipe is 1.544 Mbit/s.

**Verification:** This matches the familiar 1.544 Mbit/s PRI configuration.

---

### Example 3 — Calculate network utilization

**Problem:** A network link has a capacity of 200 Mbit/s and carries 150 Mbit/s. Calculate utilization.

**Given:**

$$
R_{\text{used}}=150\text{ Mbit/s}
$$
$$
R_{\text{capacity}}=200\text{ Mbit/s}
$$

**Required:** Utilization.

**Formula:**

$$
U=\frac{R_{\text{used}}}{R_{\text{capacity}}}\times100
$$

**Calculation:**

$$
U=\frac{150}{200}\times100
$$
$$
\boxed{U=75\%}
$$

**Interpretation:** The link is using 75% of its nominal capacity.

**Verification:** 75% of 200 Mbit/s is 150 Mbit/s.

**Common mistake:** Reporting 75 Mbit/s rather than 75%.

---

### Example 4 — Calculate packet loss

**Problem:** A network sends 5,000 packets, but the receiver obtains 4,950 packets. Calculate packet loss.

**Given:**

$$
N_{\text{sent}}=5000
$$
$$
N_{\text{received}}=4950
$$

**Required:** Packet-loss percentage.

**Calculation:**

$$
L=\frac{5000-4950}{5000}\times100
$$
$$
L=\frac{50}{5000}\times100
$$
$$
\boxed{L=1\%}
$$

**Interpretation:** One percent of the transmitted packets did not arrive at the receiver during the measurement.

**Verification:** 1% of 5,000 is 50 packets.

---

### Example 5 — Select a QoS route

**Problem:** A flow requires at least 8 Mbit/s of available bandwidth. Two possible routes are available.

|Route|Delay|Available bandwidth|
|---|--:|--:|
|A|30 ms|5 Mbit/s|
|B|55 ms|12 Mbit/s|

Which route meets the bandwidth requirement?

**Given:**

$$
B_{\text{required}}=8\text{ Mbit/s}
$$

**Required:** Feasible route based on bandwidth.

**Reasoning:**

- Route A provides 5 Mbit/s, below the requirement.
- Route B provides 12 Mbit/s, above the requirement.

Therefore:

$$
\boxed{\text{Route B is feasible}}
$$

**Interpretation:** Route B is slower in terms of delay but satisfies the strict bandwidth requirement.

**Professional qualification:** A route being feasible based on available bandwidth does not guarantee that bandwidth will remain available. Reservation and admission control may be required.

---

### Example 6 — Explain RSVP operation

**Problem:** Explain how RSVP establishes a reservation between a sender and receiver.

**Given:** A sender, two intermediate routers and a receiver.

**Required:** Message sequence.

**Solution:**

1. The sender sends PATH downstream.
2. The message passes through the routers toward the receiver.
3. The receiver sends RESV upstream.
4. Each router checks capacity and policy.
5. A router accepts or rejects the request.
6. Soft state is maintained and periodically refreshed.

**Diagram:**

```
Sender ----PATH----> R1 ----PATH----> R2 ----PATH----> Receiver

Sender <---RESV----- R1 <---RESV----- R2 <---RESV----- Receiver
```

**Interpretation:** PATH establishes downstream path information; RESV requests the resource reservation in the reverse direction.

**Common mistake:** Drawing both messages in the same direction.

---

### Example 7 — Trace MPLS label switching

**Problem:** A packet arrives at an LSR with label 15. Its forwarding table specifies that label 15 must be replaced with label 24 and sent through interface 1. What happens?

**Given:**

|Incoming label|Outgoing interface|Outgoing label|
|--:|---|--:|
|15|1|24|

**Required:** Forwarding operation.

**Solution:**

1. The LSR receives the packet.
2. It reads label 15.
3. It looks up label 15 in its forwarding table.
4. It selects interface 1.
5. It swaps label 15 for label 24.
6. It forwards the packet.

$$
\boxed{\text{Label operation: SWAP }15\rightarrow24}
$$

**Interpretation:** The intermediate router forwards based on the MPLS label rather than performing a full IP destination lookup.

---

### Example 8 — Explain tunnelling

**Problem:** An organization uses IPv6 internally, but an intermediate network supports only IPv4. Explain how tunnelling can help.

**Solution:**

1. The original IPv6 packet is created.
2. The tunnel entry router receives it.
3. The IPv6 packet is encapsulated inside an IPv4 packet.
4. The intermediate network forwards the outer IPv4 packet.
5. The tunnel exit router removes the IPv4 header.
6. The original IPv6 packet is forwarded.

**Diagram:**

```
IPv6 packet
    |
    v
Tunnel entry
    |
    v
+-----------------------+
| IPv4 outer header     |
| +-------------------+ |
| | IPv6 header       | |
| | IPv6 payload      | |
| +-------------------+ |
+-----------------------+
    |
    v
IPv4-only network
    |
    v
Tunnel exit
    |
    v
Original IPv6 packet
```

**Interpretation:** Encapsulation allows an IPv6 packet to cross a network that forwards IPv4.

**Common mistake:** Claiming that encapsulation automatically encrypts the original packet.

---

### Example 9 — Explain DTN routing

**Problem:** A remote network has no continuous connection between source and destination. Explain how DTN can deliver a message.

**Solution:**

1. The source creates a bundle.
2. The local node stores it.
3. A contact opportunity becomes available.
4. The bundle is forwarded to another node.
5. The receiving node stores the bundle.
6. Further contacts allow it to move toward the destination.
7. The destination eventually receives it.

**Interpretation:** DTN uses storage and future contact opportunities rather than requiring a continuous end-to-end path.

---

## D. What distinguishes an excellent answer?

|Level|Characteristics|
|---|---|
|Inadequate|Memorized definitions and unsupported claims|
|Competent|Correct principles and justified results|
|Excellent|Explains mechanisms, checks assumptions, evaluates alternatives, interprets evidence and acknowledges limitations|

### Example: answering “Compare IntServ and DiffServ”

**Inadequate answer:** IntServ is for individual users and DiffServ is for groups.

**Competent answer:** IntServ uses per-flow signalling and reservations, while DiffServ aggregates traffic into classes and applies per-hop behaviour.

**Excellent answer:** IntServ supports fine-grained resource control but requires per-flow state and signalling at participating routers, creating scalability challenges. DiffServ aggregates flows into a smaller number of classes and reduces per-flow state in the core. However, DiffServ requires careful provisioning, and class marking alone does not provide quantitative end-to-end guarantees.

---

## E. Independent application

### Transfer problem: Designing QoS for a university campus

Suppose a university has:

- Online classes.
- Voice communication.
- Student web access.
- Large software downloads.
- Administrative applications.

### Which principles remain valid?

- Different applications have different performance requirements.
- Traffic classification can help identify application types.
- Queue management influences packet delay.
- Network capacity limits total traffic.
- Monitoring is necessary to verify service.

### Which assumptions need reconsideration?

- The campus may have multiple network technologies.
- Wireless users may experience interference.
- Traffic demand changes throughout the day.
- Students may use applications that are difficult to classify.
- Security and privacy requirements may restrict traffic inspection.

### Additional information required

- Campus topology.
- Number of users.
- Link capacities.
- Application traffic profiles.
- Peak-period utilization.
- Existing network equipment.
- Security policies.

### Adapted method

1. Measure normal and peak traffic.
2. Identify important application classes.
3. Establish performance targets.
4. Configure appropriate classification and queue policies.
5. Test under realistic load.
6. Verify delay, jitter, loss and throughput.
7. Adjust capacity and policies according to measured results.

**Independent reasoning principle:** Do not select a network technology merely because it is advanced or widely used. Select it because its mechanisms address a demonstrated requirement, and verify that the implementation meets that requirement.

