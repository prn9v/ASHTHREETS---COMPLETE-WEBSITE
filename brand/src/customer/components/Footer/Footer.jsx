import { Grid, Typography } from '@mui/material'
import React from 'react'

// const Footer = () => {
//   return (
//     <footer class=" bg-gray-200 text-muted-foreground py-28 px-4 md:px-8 mt-20">
//   <div class="container mx-auto flex flex-col md:flex-row justify-between">
//     <div class="flex flex-col mb-6">
//       <h4 class="font-bold mb-2">SHOP</h4>
//       <a href="#" class="hover:text-primary">Ladies</a>
//       <a href="#" class="hover:text-primary">Men</a>
//       <a href="#" class="hover:text-primary">Baby</a>
//       <a href="#" class="hover:text-primary">Kids</a>
//       <a href="#" class="hover:text-primary">Sport</a>
//       <a href="#" class="hover:text-primary">Magazine</a>
//     </div>
//     <div class="flex flex-col mb-6">
//       <h4 class="font-bold mb-2">CORPORATE INFO</h4>
//       <a href="#" class="hover:text-primary">Career </a>
//       <a href="#" class="hover:text-primary">About </a>
//       <a href="#" class="hover:text-primary">Sustainability </a>
//       <a href="#" class="hover:text-primary">Press</a>
//       <a href="#" class="hover:text-primary">Investor relations</a>
//       <a href="#" class="hover:text-primary">Corporate governance</a>
//     </div>
//     <div class="flex flex-col mb-6">
//       <h4 class="font-bold mb-2">HELP</h4>
//       <a href="#" class="hover:text-primary">Customer Service</a>
//       <a href="#" class="hover:text-primary">Legal & Privacy</a>
//       <a href="#" class="hover:text-primary">Contact</a>
//       <a href="#" class="hover:text-primary">Report a scam</a>
//       <a href="#" class="hover:text-primary">Cookie Notice</a>
//       <a href="#" class="hover:text-primary">Cookie Settings</a>
//     </div>
//   </div>
//   <div class="flex justify-center my-4 pt-20 px-10">
//     <a href="#" >
//       <img src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-04-512.png" alt="Instagram" class="hover:scale-110 transition-transform duration-200" className=' object-contain h-8 w-16  ' />
//     </a>
//     <a href="#" >
//       <img src="https://i.pinimg.com/236x/04/c2/0d/04c20de4344d1bcf844a964362aa2650.jpg" alt="Youtube" class="hover:scale-110 transition-transform duration-200"  className=' object-cover h-8 w-16 mix-blend-multiply' />
//     </a>
//     <a href="#" class="mx-2">
//       <img src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-02-512.png" alt="Facebook" class="hover:scale-110 transition-transform duration-200"  className=' object-contain h-8 w-16' />
//     </a>
//     <a href="#" class="mx-2">
//       <img src="https://i.pinimg.com/564x/b7/09/9b/b7099bda33483035bfd212eefe4b216b.jpg" alt="Pinterest" class="hover:scale-110 transition-transform duration-200"  className=' object-contain h-8 w-16 ' />
//     </a>
//     <a href="#" class="mx-2">
//       <img src="https://imgs.search.brave.com/DAMx0cfU4274k6wf8z_XvG0VAlEfq-4IFMh5X_ETQLc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY4ODY2MzIy/NnRocmVhZHMtbG9n/by1wbmcucG5n" alt="Threads" class="hover:scale-110 transition-transform duration-200"  className=' object-contain h-8 w-16 ' />
//     </a>
//   </div>
//   <p class="text-center text-sm mt-4">The content of this site is copyright-protected</p>
//   <p class="text-center text-sm">INDIA | ₹.</p>
// </footer>
//   )
// }

// export default Footer

const Footer = () => {
  return (
    <footer className=" bg-gray-200 text-foreground py-16 px-4 md:px-8 mt-20">
      <div className="container mx-auto ml-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h4 className="font-bold text-lg mb-4 text-primary">SHOP</h4>
          <div className="space-y-2">
            <a href="#" className="block hover:text-primary transition-colors">
              Ladies
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Men
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Baby
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Kids
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Sport
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Magazine
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg mb-4 text-primary">CORPORATE INFO</h4>
          <div className="space-y-2">
            <a href="#" className="block hover:text-primary transition-colors">
              Career
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Sustainability
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Press
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Investor relations
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Corporate governance
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-lg mb-4 text-primary">HELP</h4>
          <div className="space-y-2">
            <a href="#" className="block hover:text-primary transition-colors">
              Customer Service
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Legal & Privacy
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Contact
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Report a scam
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Cookie Notice
            </a>
            <a href="#" className="block hover:text-primary transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-6 my-12">
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img
            src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-04-512.png"
            alt="Instagram"
            width={32}
            height={32}
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img
            src="https://i.pinimg.com/236x/04/c2/0d/04c20de4344d1bcf844a964362aa2650.jpg"
            alt="Youtube"
            width={32}
            height={32}
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img
            src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-02-512.png"
            alt="Facebook"
            width={32}
            height={32}
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img
            src="https://i.pinimg.com/564x/b7/09/9b/b7099bda33483035bfd212eefe4b216b.jpg"
            alt="Pinterest"
            width={32}
            height={32}
          />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img
            src="https://imgs.search.brave.com/DAMx0cfU4274k6wf8z_XvG0VAlEfq-4IFMh5X_ETQLc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY4ODY2MzIy/NnRocmVhZHMtbG9n/by1wbmcucG5n"
            alt="Threads"
            width={32}
            height={32}
          />
        </a>
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">The content of this site is copyright-protected</p>
        <p className="text-sm text-muted-foreground">INDIA | ₹</p>
      </div>
    </footer>
  )
}

export default Footer

