# Smart Medicine Reminder and Monitoring System

## Project Context for AI Website Development

This document explains our college project so an AI coding tool can
understand the product, its purpose, proposed hardware, limitations, and
website requirements.

------------------------------------------------------------------------

## 1. Project Information

-   **Project Title:** Smart Medicine Reminder and Monitoring System
-   **Slogan:** Right Medicine, Right Time.
-   **College:** Ahalia School of Engineering and Technology
-   **Department:** Computer Science and Engineering
-   **Course:** PBCST504 -- Microcontrollers
-   **Guide:** Dr. Balamurugan V

### Team Members

1.  NATH.S --- ATP24CS077
2.  PRAGATHEESH M --- ATP24CS088
3.  MOHAMMED RILWAN M --- ATP24CS070
4.  NAVANEETH KRISHNA S --- ATP24CS078

------------------------------------------------------------------------

## 2. Project Overview

This project proposes a simple and budget-friendly medicine reminder and
monitoring system.

The system is designed to remind users to take medicines at scheduled
times and record a basic interaction with the medicine box or medicine
strip.

The physical product is intended to be a student-built prototype using a
simple cardboard, foam-board, or affordable plastic enclosure. The
product should not look like an expensive commercial medical device.

The current website will be an **interactive simulated demonstration**
because the physical prototype is not yet fully completed.

------------------------------------------------------------------------

## 3. Problem Statement

People may forget to take medicines at the scheduled time. This can make
it difficult to follow a regular medication routine.

The problem can be more important for:

-   Elderly users
-   People taking multiple medicines
-   Users following strict medicine schedules
-   People who need simple reminders at home

A normal medicine box usually stores medicines but does not provide
electronic reminders, alerts, interaction tracking, or a digital
history.

------------------------------------------------------------------------

## 4. Proposed Solution

The proposed product is a simple medicine box or medicine-strip holder
containing:

-   Medicine compartments or strip holders
-   OLED display
-   Buzzer
-   LED indicator
-   STM32WB55 microcontroller
-   RTC for scheduled time
-   Conceptual interaction or removal sensor
-   Battery or power supply
-   Proposed Bluetooth Low Energy connectivity

The system should:

1.  Store a medicine name and reminder time.
2.  Check the scheduled time.
3.  Activate a buzzer and LED when a reminder is due.
4.  Show medicine information on the OLED display.
5.  Detect a box or medicine-strip interaction.
6.  Update the simulated status.
7.  Record the event in a history log.
8.  Support a proposed mobile application concept.

------------------------------------------------------------------------

## 5. Proposed Hardware

### Main Microcontroller

**STM32WB55**

Relevant capabilities:

-   ARM Cortex-M4 core
-   Bluetooth Low Energy capability
-   GPIO control
-   Display interfacing
-   Buzzer and LED control
-   Sensor interfacing

### Other Components

-   OLED display using I2C
-   Buzzer
-   LED
-   RTC module or timekeeping system
-   Medicine box or strip holder
-   Interaction/removal sensor
-   Battery or power supply
-   Connecting wires
-   Prototype board
-   Optional buttons

The final circuit, sensor arrangement, power circuit, and enclosure will
be finalized during implementation.

------------------------------------------------------------------------

## 6. Working Principle

The proposed workflow is:

``` text
Reminder Schedule Set
          |
          v
Scheduled Time Reached
          |
          v
STM32 Checks Reminder
          |
          v
OLED + Buzzer + LED Alert
          |
          v
User Opens Box or Interacts with Strip
          |
          v
Sensor Detects Interaction
          |
          v
Status Updated
          |
          v
Event Added to History
```

### Example

``` text
Medicine: Paracetamol
Time: 08:00 AM
Dose: 1 Tablet
Status: Scheduled
```

When the reminder is triggered:

``` text
Status: Reminder Active
Buzzer: ON
LED: ON
```

After a simulated interaction:

``` text
Status: Interaction Detected
Buzzer: OFF
LED: Updated
```

If the reminder is missed:

``` text
Status: Dose Missed - Simulation
```

------------------------------------------------------------------------

## 7. Important Technical Limitation

The proposed sensor can detect an interaction, such as:

-   Opening the box
-   Moving a medicine strip
-   Removing a medicine
-   Detecting a magnetic or mechanical event

The sensor cannot confirm that the user actually swallowed the medicine.

Therefore, the website must use terms such as:

-   Interaction Detected
-   Removal Detected
-   Box Opened
-   Status Updated

Do not claim that the system directly detects whether medicine was
swallowed.

------------------------------------------------------------------------

## 8. Main Features

### Medicine Reminder

Provides an alert at the scheduled time.

### OLED Display

Example display:

``` text
Medicine Reminder
Paracetamol
Time: 08:00 AM
Dose: 1 Tablet
Status: Scheduled
```

### Buzzer

Provides an audio alert when the reminder is active.

### LED

Provides a visual alert using different simulated states, such as:

-   Off
-   Reminder Active
-   Interaction Detected
-   Missed Dose
-   System Ready

### Interaction Detection

The proposed sensor detects interaction with the box or medicine strip.

### Medication History

The system can record simulated events, such as:

-   Reminder triggered
-   Interaction detected
-   Missed dose
-   Reminder time changed
-   Medicine name changed

### Proposed Mobile Connectivity

Bluetooth Low Energy is proposed for nearby device-to-phone
communication.

The proposed mobile application may allow users to:

-   View medicine information
-   Change the medicine name
-   Change the reminder time
-   View device status
-   View medication history

BLE communication is a proposed feature and must not be presented as
already implemented unless actual hardware testing has been completed.

------------------------------------------------------------------------

## 9. Connectivity Limitation

Bluetooth Low Energy is suitable for nearby communication between the
device and a phone.

If the phone is outside Bluetooth range, remote notifications would
require an additional internet connection or gateway.

Zigbee and Thread may be considered in the future, but they are not
required for the initial demonstration.

------------------------------------------------------------------------

## 10. Prototype Design

The prototype should be simple and affordable.

### Possible Materials

-   Cardboard
-   Foam board
-   Affordable plastic box
-   Transparent plastic or acrylic cover
-   Cardboard dividers
-   Basic electronic modules

### Product Appearance

The product should contain:

-   Transparent top cover
-   Medicine compartments or strip holder
-   Front panel
-   OLED display
-   Buzzer
-   LED
-   Internal controller board
-   Battery or power supply

Do not redesign the product as an expensive futuristic smart device. The
website should represent a realistic student prototype.

------------------------------------------------------------------------

## 11. Reference Images

Two images will be uploaded with this document:

### Image 1: Simple Prototype

Shows a basic cardboard-style medicine box with:

-   Transparent cover
-   Medicine compartments
-   OLED display
-   Buzzer
-   LED indicator
-   Simple enclosure

### Image 2: Exploded View

Shows:

-   Transparent cover
-   Medicine box or strip holder
-   Front panel
-   OLED display
-   Buzzer
-   LED
-   STM32WB55 board
-   Battery
-   Bottom enclosure
-   Final assembled view

Use these images as the primary visual references. Do not replace them
with unrelated commercial product images.

------------------------------------------------------------------------

## 12. Website Purpose

The website is a scrolling, interactive project demonstration.

It should explain:

1.  The real-world problem
2.  Project objectives
3.  Proposed solution
4.  Product appearance
5.  Exploded view
6.  Hardware architecture
7.  Working principle
8.  Interactive reminder simulation
9.  Proposed mobile application
10. Features
11. Applications
12. Limitations
13. Future scope
14. Conclusion

The website is a simulation and presentation tool, not proof that the
physical hardware is already completed.

------------------------------------------------------------------------

## 13. Website Design

### UI Style

Use a modern **neomorphic UI design**.

Design characteristics:

-   Soft white and light-gray background
-   Raised and inset shadows
-   Rounded cards
-   Blue, green, and orange accent colors
-   Clean typography
-   Clear spacing
-   Professional healthcare technology appearance
-   High readability during a college presentation

### Animation Style

Use advanced but controlled scroll-based storytelling:

-   GSAP ScrollTrigger if available
-   Smooth scrolling
-   Sticky visual panels
-   Image zoom
-   Subtle parallax
-   Text reveal
-   Component callout animations
-   Animated arrows and connection lines
-   Staggered card animations
-   Timeline progression
-   Smooth section transitions

Do not animate every element simultaneously. Animations should support
the explanation and remain smooth on a normal laptop.

------------------------------------------------------------------------

## 14. Required Website Sections

### Section 1: Hero

Show:

-   Project title
-   Slogan
-   College
-   Department
-   Guide
-   Team members
-   Prototype image
-   Demo Mode badge
-   Start Demo button

### Section 2: Problem Statement

Show a person forgetting medicine and explain the need for reminders and
tracking.

### Section 3: Objectives

Show cards for:

-   Timely reminders
-   OLED display
-   Audio and visual alerts
-   Interaction detection
-   Medication history
-   Proposed mobile connectivity

### Section 4: Proposed Solution

Show the simple prototype image and explain the components.

### Section 5: Exploded View

Use the uploaded exploded-view image. Reveal component labels one by
one:

1.  Transparent cover
2.  Medicine box or strip holder
3.  Front panel
4.  OLED display
5.  Buzzer
6.  LED indicator
7.  STM32WB55 board
8.  Battery
9.  Bottom enclosure

The exploded view may be animated as an image with zooming, panning,
callouts, and labels. A complicated 3D model is not necessary.

### Section 6: Hardware Architecture

Show:

``` text
RTC → STM32WB55 → OLED Display
                  |
                  +→ Buzzer
                  |
                  +→ LED
                  |
                  +→ Interaction Sensor
                  |
                  +→ Proposed BLE Mobile App
```

### Section 7: Working Principle

Show:

``` text
Schedule Set
→ Reminder Triggered
→ OLED + Buzzer + LED Alert
→ User Interaction
→ Interaction Detected
→ Status Updated
→ History Recorded
```

### Section 8: Interactive Simulation

Add working controls:

-   Trigger Reminder
-   Simulate Interaction Detected
-   Simulate Missed Dose
-   Change Medicine Name
-   Change Reminder Time
-   Reset Demo

The simulation must work entirely on the frontend without a backend.

### Section 9: OLED Display

Create a simulated OLED display whose content changes based on the
selected demo state.

### Section 10: Mobile Application Concept

Show a phone mockup with:

-   Medicine name
-   Reminder time
-   Device status
-   Medication history
-   Edit medicine information
-   Proposed BLE connection

Clearly label this as a proposed mobile application concept.

### Section 11: Features

Show cards for:

-   Medicine reminders
-   OLED display
-   Buzzer
-   LED
-   Interaction detection
-   Medication history
-   BLE concept
-   Affordable enclosure

### Section 12: Applications

Show:

-   Personal medicine reminders
-   Elderly-care assistance
-   Home healthcare routines
-   Medication schedule monitoring
-   Educational embedded-system projects

Do not describe the project as a certified medical device.

### Section 13: Limitations and Future Scope

Limitations:

-   Website is a simulation
-   Physical hardware is not completed
-   Sensor accuracy requires testing
-   Interaction detection does not confirm swallowing
-   BLE range depends on the environment
-   Final PCB and enclosure require development

Future scope:

-   Physical hardware integration
-   Mobile application development
-   Improved sensing
-   Medication history storage
-   Remote notification using a suitable gateway
-   PCB design and testing

### Section 14: Conclusion

Use this conclusion:

> The proposed Smart Medicine Reminder and Monitoring System aims to
> support timely medication routines through reminders, visual
> indication, and interaction tracking. The low-cost concept combines
> microcontroller-based control with a simple enclosure and proposed
> mobile connectivity.

------------------------------------------------------------------------

## 15. Interactive Demo States

### Initial State

``` text
Medicine Reminder
Paracetamol
Time: 08:00 AM
Dose: 1 Tablet
Status: Scheduled
```

### Reminder Active

``` text
Medicine Reminder
Paracetamol
Time: 08:00 AM
Dose: 1 Tablet
Status: Reminder Active
Buzzer: ON
LED: ON
```

### Interaction Detected

``` text
Medicine Reminder
Paracetamol
Time: 08:00 AM
Dose: 1 Tablet
Status: Interaction Detected
Buzzer: OFF
LED: Updated
```

### Missed Dose

``` text
Medicine Reminder
Paracetamol
Time: 08:00 AM
Dose: 1 Tablet
Status: Dose Missed - Simulation
```

The website should record these simulated events in an activity log.

------------------------------------------------------------------------

## 16. Technical Requirements

The AI coding tool should:

-   Use React and Vite if suitable.
-   Use GSAP and ScrollTrigger for advanced scrolling.
-   Use reusable components.
-   Use local image assets.
-   Provide responsive desktop and mobile layouts.
-   Add alt text to images.
-   Support keyboard navigation.
-   Maintain good color contrast.
-   Avoid a backend and API keys.
-   Avoid paid services.
-   Make all buttons functional.
-   Include a reset function.
-   Handle image loading correctly.
-   Avoid layout shifts.
-   Test for console errors.
-   Provide instructions for running the project locally.

If advanced 3D development becomes unreliable, use image-based animation
instead.

------------------------------------------------------------------------

## 17. Honesty Rules

The website must display:

**DEMO MODE --- SIMULATED PROTOTYPE**

Use terms such as:

-   Proposed System
-   Conceptual Design
-   Simulated Prototype
-   Interaction Detected
-   Removal Detected
-   Future Implementation
-   Proposed Mobile Application

Do not:

-   Claim that the physical hardware is already completed.
-   Claim that BLE communication is currently working without testing.
-   Claim that medicine swallowing is detected.
-   Claim medical certification.
-   Show fake sensor readings as real measurements.
-   Present simulated results as actual experimental results.

------------------------------------------------------------------------

## 18. Final Goal

The final website should be:

-   Professional
-   Interactive
-   Neomorphic
-   Scroll-driven
-   Visually impressive
-   Easy to demonstrate
-   Realistic for a student project
-   Based on the simple prototype images
-   Honest about the current implementation stage

The website should help the audience understand the problem, product
design, hardware components, working principle, and future development
clearly.

------------------------------------------------------------------------

## 19. Final AI Checklist

Before finishing the website, verify that:

-   All sections are present.
-   Navigation links work.
-   Prototype images load correctly.
-   All demo buttons work.
-   OLED content updates.
-   Simulated history is recorded.
-   Reset works.
-   The website is responsive.
-   Animations run smoothly.
-   There are no console errors.
-   The design remains simple and budget-friendly.
-   The website does not make false claims about completed hardware.
