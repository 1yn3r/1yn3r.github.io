### `$ whoami`

### Hi there, I'm HC ✔️

> [![View count](https://visitcount.itsvg.in/api?id=1yn3r&color=6&icon=0&pretty=true)](https://visitcount.itsvg.in/api?id=1yn3r)

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
<br>
<div class="modelViewPort">
  <div class="eva">
    <div class="head">
      <div class="eyeChamber">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
    </div>
    <div class="body">
      <div class="hand"></div>
      <div class="hand"></div>
      <div class="scannerThing"></div>
      <div class='scannerOrigin'></div>
    </div>
  </div>
</div>
:root{
  --EVA-ROTATION-DURATION: 4s;
}
body{
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #001A4B;
}

.modelViewPort{
  perspective: 1000px;
  width: 20rem;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
}
.eva{
  transform-style: preserve-3d;
  animation: rotateRight var(--EVA-ROTATION-DURATION) linear infinite alternate;
}
.head{
  position: relative;
  width: 6rem;
  height: 4rem;
  border-radius: 48% 53% 45% 55% / 79% 79% 20% 22% ;
  background: linear-gradient(to right, white 45%, gray)
}
.eyeChamber{
  width: 4.5rem;
  height: 2.75rem;
  position: relative;
  left: 50%;
  top: 55%;
  border-radius: 45% 53% 45% 48% / 62% 59% 35% 34% ;
  background-color: #0C203C;
  box-shadow: 0px 0px 2px 2px white, inset 0px 0px 0px 2px black;
  transform: translate(-50%, -50%);
  animation: moveRight var(--EVA-ROTATION-DURATION) linear infinite alternate;
}
.eye{
  width: 1.2rem;
  height: 1.5rem;
  position: absolute;
  border-radius: 50%;
}
.eye:first-child{
  left: 12px;
  top: 50%;
   background: repeating-linear-gradient(
    65deg, 
    #9bdaeb 0px, 
    #9bdaeb 1px,
    white 2px
  );
  box-shadow: inset 0px 0px 5px #04B8D5, 0px  0px 15px 1px #0bdaeb;
  transform: translate(0, -50%) rotate(-65deg);
}
.eye:nth-child(2){
  right: 12px;
  top: 50%;
  background: repeating-linear-gradient(
    -65deg, 
    #9bdaeb 0px, 
    #9bdaeb 1px,
    white 2px
  );
  box-shadow: inset 0px 0px 5px #04B8D5, 0px  0px 15px 1px #0bdaeb;
  transform: translate(0, -50%) rotate(65deg);
}
.body{
  width: 6rem;
  height: 8rem;
  position: relative;
  margin-block-start: 0.25rem;
  border-radius: 47% 53% 45% 55% / 12% 9% 90% 88%;
  background: linear-gradient(to right, white 35%, gray);
}
.hand{
  position: absolute;
  left: -1.5rem;
  top: .75rem;
  width: 2rem;
  height: 5.5rem;
  border-radius: 40%;
  background: linear-gradient(to left, white 15%, gray);
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.25);
  transform: rotateY(55deg) rotateZ(10deg);
}
.hand:first-child{
  animation: compensateRotation var(--EVA-ROTATION-DURATION) linear infinite alternate;
}
.hand:nth-child(2){
  left: 92%;
  background: linear-gradient(to right, white 15%, gray);
  transform: rotateY(55deg) rotateZ(-10deg);
  animation: compensateRotationRight var(--EVA-ROTATION-DURATION) linear infinite alternate;
}
.scannerThing{
  width: 0;
  height: 0;
  position: absolute;
  left: 60%;
  top: 10%;
  border-top: 180px solid #9bdaeb;
  border-left: 250px solid transparent;
  border-right: 250px solid transparent;
  transform-origin: top left; 
  mask: linear-gradient(to right, white, transparent 35%);
  animation: glow 2s cubic-bezier( 0.86, 0, 0.07, 1 ) infinite;
}
.scannerOrigin{
  position: absolute;
  width: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  left: 60%;
  top: 10%;
  background: #9bdaeb;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.5);
  animation: moveRight var(--EVA-ROTATION-DURATION) linear infinite;
}
@keyframes rotateRight{
  from{
    transform: rotateY(0deg);
  }
  to{transform: rotateY(25deg)}
}
@keyframes moveRight{
  from{transform: translate(-50%, -50%)}
  to{transform: translate(-40%, -50%)}
}
@keyframes compensateRotation{
  from{
    transform: rotateY(55deg) rotateZ(10deg);
  }
  to{
    transform: rotatey(30deg) rotateZ(10deg);
  }
}
@keyframes compensateRotationRight{
  from{
     transform: rotateY(55deg) rotateZ(-10deg); 
  }
  to{
    transform: rotateY(70deg) rotateZ(-10deg);
  }
}
@keyframes glow{
  from{
    opacity: 0;
  }
  20%{
    opacity: 1;
  }
  45%{
    transform: rotate(-25deg)
  }
  75%{
    transform: rotate(5deg)
  }    
  100%{
    opacity: 0;
  }
}
<br>

- 🇻🇳 : I'm from VietNam
- ❤️ : I'm passionate about:
  - 🔐 Cyber Security
  - 🪐 Operating Systems (Windows & Linux)
  - 🖥️ Website Developer
  - 📝 Writeups and Documenting
    
<h2 align="center">🛠 Technologies and Tools 🛠</h2>
<br>
<!-- https://simpleicons.org/ -->
<span><img src="https://img.shields.io/badge/JavaScript-282C34?logo=javascript&logoColor=F7DF1E" alt="JavaScript logo" title="JavaScript" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/ReactJS-282C34?logo=react&logoColor=61DAFB" alt="ReactJS logo" title="ReactJS" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/Node.js-282C34?logo=node.js&logoColor=00F200" alt="Node.js logo" title="Node.js" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/Express-282C34?logo=express&logoColor=FFFFFF" alt="Express.js logo" title="Express.js" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/MongoDB-282C34?logo=mongodb&logoColor=47A248" alt="MongoDB logo" title="MongoDB" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/Sass-282C34?logo=sass&logoColor=CC6699" alt="SASS logo" title="SASS" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/Bootstrap-282C34?logo=bootstrap&logoColor=7952B3" alt="Bootstrap logo" title="Bootstrap" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/git-282C34?logo=git&logoColor=F05032" alt="git logo" title="git" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/VS%20Code-282C34?logo=visual-studio-code&logoColor=007ACC" alt="Visual Studio Code logo" title="Visual Studio Code" height="25" /></span>
&nbsp;
<span><img src="https://img.shields.io/badge/WordPress-282C34?logo=wordPress&logoColor=21759B" alt="WordPress logo" title="WordPress" height="25" /></span>
&nbsp;

<br>
<h2 align="center">🔥 GitHub Stats 🔥</h2>
<!-- https://github.com/anuraghazra/github-readme-stats -->
<br>
<div align=center>
  <a href="#" title="1yn3r">
    <img width="315" align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=1yn3r&hide=c%23,powershell,Mathematica,Ruby,Objective-C,Objective-C%2b%2b,Cuda&title_color=61dafb&text_color=ffffff&icon_color=61dafb&bg_color=20232a&langs_count=8&layout=compact&border_color=61dafb&hide_border=true" />
  </a>
  <a href="#" title="1yn3r">
    <img align="right" width="434" src="https://github-readme-stats.vercel.app/api?username=1yn3r&show_icons=true&theme=react&border_color=61dafb&hide_border=true" />
  </a>
</div>

<br>
<h2 align="center">👽 Where to find me 👽</h2>
<br>
<!-- https://icons8.com -->
<div align="center">
  <a href="https://facebook.com/1yn3r" target="blank">
    <img src="https://img.icons8.com/bubbles/100/000000/facebook-new.png" alt="trungquandev-facebook" />
  </a>
  <a href="https://www.linkedin.com/in/1yn3r" target="blank">
    <img src="https://img.icons8.com/bubbles/100/000000/linkedin.png" alt="trungquandev-linkedin" />
  </a>
  <a href="https://instagram.com/__1yn3r" target="blank">
    <img src="https://img.icons8.com/bubbles/100/000000/instagram.png" alt="trungquandev-instagram" />
  </a>
  <a href="mailto:hc223390@gmail.com" target="top">
    <img src="https://img.icons8.com/bubbles/100/000000/apple-mail.png" alt="trungquandev-email" />
  </a>
</div>

<br>


