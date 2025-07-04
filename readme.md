# Taipei Travel Search
### http://35.75.244.94:8000/
> Helping you quickly find Taipei’s attractions and plan your trip using real-time transit and points-of-interest data

### Tech
<p align="center">
  <img 
    src="readme/bootcamp%20project.jpg" 
    width="600" 
    alt="page-structure" 
  />
</p>

- Adopted a Front-End/Back-End MVC architecture and deployed to AWS EC2.
- Secured user registration and login with JWT middleware.
- Implemented real-time, fuzzy keyword search for attractions near MRT stations.
- Optimized performance and UX with lazy loading and skeleton-loading animations within a fully responsive component and interface design system.
- Built a complete booking flow featuring TapPay payment integration, auto-login post-registration, and redirect handling to specified pages upon successful signup.

### Tech Stack
- Frontend / Backend Separation (MVC)
- Backend: FastAPI
- Database Design: MySQL
- Deployment: AWS EC2
- Authentication: Registration & Login
- Payments: TapPay integration
- Third-Party APIs:
  - Taipei Attractions API
  - Taipei Metro API


## Website DEMO
### Homepage Overview
- Lazy Loading
- Skeleton Loading Animation for smooth UX feedback
<p align="center">
  <img 
    src="readme/首頁概述.gif" 
    width="600" 
    alt="main-page" 
  />
</p>

- Keyword Search with instant results
- Component & Interface Design System, fully Responsive

<p align="center"> 
    <img 
        src="readme/搜尋功能.gif" 
        width="600" 
        alt="Search Functionality" 
    />
</p>

### Login & Registration
- Modular Header & Footer components
- Auto-login immediately after sign-up
- Redirect to specified page on success 
```javascript
function loginAndSignupPop(targetURL = false) { … }
```
<p align="center"> 
    <img 
        src="readme/登入註冊.gif" 
        width="600" 
        alt="Login and Registration" 
    /> 
</p>


### Booking Flow
- TapPay payment integration
<p align="center"> 
    <img 
        src="readme/booking頁面操作.gif" 
        width="600" 
        alt="Booking Flow" 
    /> 
</p>


#### Tech
- Architecture Diagrams
- Frontend (FE_MVC)

<p align="center"> 
    <img 
        src="readme/FE_MVC.png" 
        width="600" 
        alt="Frontend MVC Diagram" 
    /> 
    <img
        src="readme/BE_MVC.png" 
        width="600" 
        alt="Backend MVC Diagram" /> 
</p>


### References
- [Taipei Metro API](https://www.metro.taipei/cp.aspx?n=BDEB860F2BE3E249)
- Taipei attractions data provided by WeHelp

### Contact
- mail: yiyun.bian.design@gmail.com
- phone: +886-975498468
- linkedIn: https://www.linkedin.com/in/liao-yi-yun-119534221/
- github: https://github.com/yiyun-liao/