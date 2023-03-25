---
title: "What's next in React Native? (2022 and beyond)"
date: '2022-08-27'
---

## Versions:

**Version 0.68**- is the release version to opt in switch for new architecture. This makes the new architecture open to early adopters.

**Version 0.69 [LATEST]**- is the first release to support React 18. It is enabled by default. You can opt out of react 18 by changing one line.

To know more about react 18, check out my previous blog post
[https://dev.to/monicaacha2103/all-you-need-to-know-about-react-18-dbc](https://dev.to/monicaacha2103/all-you-need-to-know-about-react-18-dbc).

**Version 0.70 [NEXT]** : this version will ship with Hermes as the default engine.
We can expect new architecture to be released in upcoming versions.

## **Legacy architecture [< v0.70]**

1. **Native Code**: Most of the iOS native code is written in Swift/Objective C . Likewise, Android native is written in Java/Kotlin.
2. **Javascript VM:** The virtual machine that runs all the javascript code.

iOS- React Native uses **JavaScriptCore** provided by the iOS platform

Android - React Native bundles the **JavaScriptCore** along with the application. This increases the app size. Hence the Hello World application of RN would take around 3 to 4 megabytes for Android.

Web (Chrome) - In case of Chrome debugging mode, the JavaScript code runs within Chrome itself (instead of the JavaScriptCore on the device) and communicates with native code via WebSocket. Here, it will use the **V8 engine.**

![Legacy Architecture Image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u3u9qdbvwmpdts28nk0h.png)

Three main fundamentals- Threading Model, Bridge and UI Native Module

1. **React Native Bridge**- React Native bridge is a C++/Java bridge which is responsible for communication between the native and Javascript thread. A custom protocol is used for message passing. It serializes all the data that has to be passed from JS layer to native layer. The native layer then deserializes the data and performs required operations- what views to load, what information is to be retrieved from the hardware, etc.

2. **UI Modules**- Native module that maps JSX Views onto Native Views.

3. **Threading Model**-
   When a React Native application is launched, it spawns up the following threading queues-

- **Main thread** *(Native Modules)* - This is the main thread which gets spawned as soon as the application launches. It loads the app and starts the JS thread to execute the Javascript code. The native thread also listens to the UI events like 'press', 'touch', etc. These events are then passed to the JS thread via the RN Bridge. Once the Javascript loads, the JS thread sends the information on what needs to be rendered onto the screen. 

- **Shadow thread** - This information is used by a shadow node thread to compute the layouts. The shadow thread is like a mathematical engine which finally decides on how to compute the view positions. These instructions are then passed back to the **main thread** to render the view.

- **Javascript thread** - The Javascript Queue is the thread queue where main bundled JS thread runs. The JS thread runs all the business logic, i.e., the code in React Native.

- **Custom Native Modules** - Apart from the threads spawned by React Native, we can also spawn threads on the custom native modules we build to speed up the performance of the application. For example - Animations are handled in React Native by a separate native thread to offload the work from the JS thread.

**Limitations of Old Architecture**-
Asynchronous, Single threaded , Data Serialization costs when using Bridge

## **New Architecture [v0.70 onwards]-**

**Hermes Engine -**

One of the crucial point of the new architecture rollout is the adoption of the new JavaScript engine- Hermes. React Native 0.70 will ship with Hermes as the default engine. Can be opted out if there is a need to use older VMs like JavascriptCore.

**JavaScript Interface -**

The communication between JavaScript and the VM is being standardized using a JavaScript Interface (**JSI**). **JSI** makes it possible for Native components and JS to communicate with each other. It replaces the React Native Bridge.

**Turbo Modules** -
TurboModules are the next iteration on Native Modules.It speeds up the way Native Modules are initialised and invoked from JavaScript. It addresses the async and loading issues because they behave in a synchronous way in JavaScript and lazy load into memory, allowing the app to start faster.

**Codegen** -
Codegen addresses the problem with type safety, because it allows us to generate interfaces we can use to make sure our native code stays in sync with the data we are passing in from the JavaScript layer.

**Fabric -**
The new architecture uses a new rendering system, **Fabric Renderer** which has improvements in the rendering layer i.e UI's responsiveness.

**Fabric Components** are the preferred way to create reusable UI components, providing a native experience to the users. This will help reduce the overload of application architectures, and your applications will run faster than older cross-platform ones.

Fabric uses **JSI** to expose methods to JavaScript code. This will help reduce the overload of application architectures, and your applications will run faster than older cross-platform ones.

Fabric uses a **single thread** , will help the UI to communicate via callbacks via JavaScript.

We've often seen cross-platform applications struggle with the gap between shared code and native environments. To improve the flow of data and debug such errors, you need your own bridges. Fabric will provide a simplified **native bridge** between JS and frameworks.

**Improvements in the new architecture -**

- Efficient communication between JS and OS platforms
- Improved user experience through highly reactive user interfaces
- Better code sharing with debugging capabilities
- Fast loading of mobile applications
- Synchronous Executions
- Faster build
- Concurrency
- Less overhead of data serialization
- Type Safety
