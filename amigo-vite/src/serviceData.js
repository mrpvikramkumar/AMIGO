export const MEGA_MENU_DATA = {
  electrical: {
    title: 'ELECTRICAL',
    items: [
      { id: 'missile-cable', title: 'Missile Cable assembly & Section Testing' },
      { id: 'system-integration', title: 'System Integration' },
      { id: 'cable-harness', title: 'Cable Harness' },
      { id: 'test-jigs', title: 'Test Jigs' },
      { id: 'relay-wiring', title: 'Relay Wiring' }
    ]
  },
  electronic: {
    title: 'ELECTRONIC',
    items: [
      { id: 'pcb-design', title: 'PCB Design' },
      { id: 'pcb-assembly', title: 'PCB assembly' },
      { id: 'embedded-system', title: 'Embedded System' },
      { id: 'bread-box', title: 'Bread Box' }
    ]
  },
  mechanical: {
    title: 'MECHANICAL',
    items: [
      { id: 'box-design', title: 'Box Design 3D&2D' },
      { id: 'box-manufacturing', title: 'Box Manufacturing' },
      { id: 'box-assembly', title: 'Box Assembly' }
    ]
  },
  serviceProvided: {
    title: 'SERVICE PROVIDED',
    items: [
      { id: 'defense-cable-harness', title: 'Defense Cable Harness work' },
      { id: 'defense-mechanical-box', title: 'Defense Mechanical box Assemble' },
      { id: 'railway-locopilot-cable', title: 'Railway Locopilot cable assembly' }
    ]
  },
  trading: {
    title: 'TRADING',
    items: [
      { id: 'grade-connectors', title: 'Grade Connectors(Series II and Series III)' },
      { id: 'relays', title: 'Relays(Hook Type, PCB Assembly)' },
      { id: 'ir-sensors', title: 'IR Sensors' },
      { id: 'shielded-cables', title: 'Shielded Cables(Twisted, Bare Wires, RF, Low Noise)' }
    ]
  },
  itSupport: {
    title: 'IT SUPPORT',
    items: [
      { id: 'jira-support', title: 'JIRA(Atlassian Support)' },
      { id: 'web-development', title: 'Web Development Support' },
      { id: 'medical-coding', title: 'Medical Coding' }
    ]
  }
};

export const SERVICE_DETAILS = {
  'missile-cable': {
    title: 'Missile Cable Assembly & Section Testing',
    tag: 'Electrical',
    description: 'Specialized cable assembly and rigorous section testing for missile and aerospace systems. We ensure flawless signal integrity and absolute reliability in the harshest environments. Our testing protocols meet the highest MIL-STD requirements to guarantee mission success.',
    features: ['MIL-STD Compliant Testing', 'Extreme Environment Durability', 'Precision Wiring', 'Automated Section Validation']
  },
  'system-integration': {
    title: 'System Integration',
    tag: 'Electrical',
    description: 'Comprehensive electrical system integration services for defense and industrial applications. We bring together diverse sub-systems into a unified, high-performance network, managing everything from power distribution to complex control logic.',
    features: ['Complex Control Logic', 'Power Distribution Management', 'Seamless Sub-system Networking', 'End-to-End Validation']
  },
  'cable-harness': {
    title: 'Cable Harness',
    tag: 'Electrical',
    description: 'Custom-designed cable harnesses engineered for maximum durability and spatial efficiency. Our manufacturing processes utilize specialized braiding, shielding, and termination techniques suitable for aerospace, defense, and heavy industrial machinery.',
    features: ['Custom Braiding & Shielding', 'EMI/RFI Protection', 'High-Density Routing', 'Ruggedized Terminations']
  },
  'test-jigs': {
    title: 'Test Jigs',
    tag: 'Electrical',
    description: 'Custom automated and manual test jigs designed to validate electrical assemblies rapidly and accurately. We build robust testing fixtures that simulate real-world loads and verify pin-to-pin continuity and functional performance.',
    features: ['Automated Continuity Testing', 'Load Simulation', 'Ergonomic Operator Interface', 'Traceability & Logging']
  },
  'relay-wiring': {
    title: 'Relay Wiring',
    tag: 'Electrical',
    description: 'Precision relay panel wiring for complex industrial automation and safety systems. We ensure neat routing, rigorous labeling, and flawless execution of relay logic circuits for critical control applications.',
    features: ['Control Panel Assembly', 'Safety Relay Integration', 'Industrial Automation', 'Rigorous Wire Labeling']
  },
  
  'pcb-design': {
    title: 'PCB Design',
    tag: 'Electronic',
    description: 'High-speed, multi-layer PCB design tailored for defense and industrial electronics. We focus on signal integrity, thermal management, and strict adherence to DFM/DFA guidelines to ensure manufacturability and operational excellence.',
    features: ['Multi-Layer Architectures', 'Impedance Control', 'Thermal Management', 'DFM / DFA Optimization']
  },
  'pcb-assembly': {
    title: 'PCB Assembly',
    tag: 'Electronic',
    description: 'State-of-the-art Printed Circuit Board assembly combining precise SMT placement with reliable through-hole soldering. Our facility handles both rapid prototyping and full-scale production with strict quality control.',
    features: ['SMT & Through-Hole', 'Automated Optical Inspection (AOI)', 'BGA Placement', 'Conformal Coating']
  },
  'embedded-system': {
    title: 'Embedded System',
    tag: 'Electronic',
    description: 'End-to-end embedded system development integrating hardware and firmware. From microcontrollers to complex FPGAs, we develop robust intelligence for connected devices, defense equipment, and industrial automation.',
    features: ['Firmware Development', 'RTOS Integration', 'Microcontroller / FPGA', 'IoT Connectivity']
  },
  'bread-box': {
    title: 'Bread Box (Prototyping)',
    tag: 'Electronic',
    description: 'Rapid prototyping and bread-box level validation of electronic circuits. Before committing to expensive PCB fabrication, we thoroughly test proof-of-concepts to derisk your product development cycle.',
    features: ['Proof of Concept', 'Circuit Validation', 'Rapid Iteration', 'Risk Mitigation']
  },

  'box-design': {
    title: 'Box Design 3D & 2D',
    tag: 'Mechanical',
    description: 'Advanced 3D modeling and 2D drafting for ruggedized mechanical enclosures. We design specialized boxes to house critical electronics, focusing on thermal dissipation, shock absorption, and environmental sealing (IP/MIL ratings).',
    features: ['CAD / CAM Modeling', 'Thermal Simulation', 'Shock & Vibration Analysis', 'IP & MIL-STD Rated Designs']
  },
  'box-manufacturing': {
    title: 'Box Manufacturing',
    tag: 'Mechanical',
    description: 'Precision fabrication of mechanical enclosures using high-grade alloys and composites. Our manufacturing capabilities include CNC machining, sheet metal bending, and protective coating applications for defense-grade durability.',
    features: ['CNC Machining', 'Sheet Metal Fabrication', 'Anodizing & Powder Coating', 'Precision Tolerances']
  },
  'box-assembly': {
    title: 'Box Assembly',
    tag: 'Mechanical',
    description: 'Complete mechanical box assembly services, integrating fabricated chassis with internal mounting structures, seals, and specialized hardware to prepare the enclosure for final electronic integration.',
    features: ['Hardware Integration', 'Environmental Sealing', 'Quality Assurance', 'Ready-for-Electronics Delivery']
  },

  'defense-cable-harness': {
    title: 'Defense Cable Harness Work',
    tag: 'Service Provided',
    description: 'Mission-critical cable harness manufacturing strictly adhering to defense and military standards. We utilize mil-spec connectors, specialized shielding, and rigorous QA to ensure uninterrupted performance in combat environments.',
    features: ['Mil-Spec Connectors', 'Combat-Ready Durability', 'Rigorous QA Protocols', 'Specialized Jacketing']
  },
  'defense-mechanical-box': {
    title: 'Defense Mechanical Box Assemble',
    tag: 'Service Provided',
    description: 'Integration of rugged mechanical boxes for defense systems. We ensure all components are securely mounted and properly shielded against EMI/EMP threats and extreme kinetic shocks.',
    features: ['EMI / EMP Shielding', 'Ruggedized Mounting', 'Kinetic Shock Resistance', 'Strict Compliance']
  },
  'railway-locopilot-cable': {
    title: 'Railway Locopilot Cable Assembly',
    tag: 'Service Provided',
    description: 'Heavy-duty cable assemblies specifically engineered for railway locomotives and locopilot cabins. These assemblies are designed to withstand extreme vibration, temperature fluctuations, and continuous industrial use.',
    features: ['Vibration Resistance', 'Flame Retardant Materials', 'Locomotive Grade Reliability', 'Heavy-Duty Terminations']
  },

  'grade-connectors': {
    title: 'Grade Connectors (Series II and Series III)',
    tag: 'Trading',
    description: 'We supply high-reliability MIL-DTL-38999 Series II and Series III connectors. Ideal for aerospace, defense, and harsh-environment industrial applications requiring secure, quick-disconnect circular connectors.',
    features: ['MIL-DTL-38999', 'High-Density Shells', 'Harsh Environment Rated', 'Quick Disconnect']
  },
  'relays': {
    title: 'Relays (Hook Type, PCB Assembly)',
    tag: 'Trading',
    description: 'Sourcing and trading of industrial and military grade relays, including hook-type and PCB-mounted variants. We provide highly durable switching solutions for power control and signal routing.',
    features: ['High Switching Capacity', 'PCB & Hook Terminations', 'Industrial Grade', 'Low Contact Resistance']
  },
  'ir-sensors': {
    title: 'IR Sensors',
    tag: 'Trading',
    description: 'High-precision Infrared (IR) sensors for industrial automation, defense targeting, and commercial security. We supply robust IR components for proximity detection, thermal imaging, and communication.',
    features: ['Precision Detection', 'Thermal & Proximity', 'Robust Housings', 'Fast Response Times']
  },
  'shielded-cables': {
    title: 'Shielded Cables',
    tag: 'Trading',
    description: 'Extensive inventory of specialized shielded cables including Twisted Pair, Bare Wires (10AWG-28AWG), RF Cables, and Low Noise Cables to ensure pristine signal transmission across all your integrations.',
    features: ['RF & Low Noise Variants', '10AWG to 28AWG', 'Twisted Pair Shielding', 'Interference Rejection']
  },

  'jira-support': {
    title: 'JIRA (Atlassian Support)',
    tag: 'IT Support',
    description: 'Expert Atlassian tool administration and support. We help you streamline your project management, optimize workflows, configure custom JIRA boards, and manage user permissions for maximum team efficiency.',
    features: ['Workflow Optimization', 'Custom Board Configuration', 'Permission Management', 'Atlassian Administration']
  },
  'web-development': {
    title: 'Web Development Support',
    tag: 'IT Support',
    description: 'Comprehensive web development and maintenance services. We build and maintain secure, scalable, and high-performance enterprise web applications tailored to your internal operational needs.',
    features: ['Enterprise Web Apps', 'Secure & Scalable', 'Performance Optimization', 'Ongoing Maintenance']
  },
  'medical-coding': {
    title: 'Medical Coding',
    tag: 'IT Support',
    description: 'Accurate and compliant medical coding support services. We assist healthcare tech companies in maintaining rigorous data standards, ensuring proper billing, and navigating complex healthcare data regulations.',
    features: ['HIPAA Compliant', 'Accurate Billing Codes', 'Healthcare Data Standards', 'Regulatory Navigation']
  }
};
