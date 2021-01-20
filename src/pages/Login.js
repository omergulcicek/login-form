import { useState } from "react"
import PasswordStrengthBar from 'react-password-strength-bar'

export default function Login() {
  const [name, setName] = useState()
  const [username, setUsername] = useState("@")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    console.log({username, password})
  }
  
  const makeUsername = (name) => {
    let usernameInput   = document.getElementById("username").classList,
        usernameText    = document.querySelectorAll("#username + small.input-text")[0]

    setName(name)

    setUsername(`@${name.toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .replace(/\s+/g,'-')
      .replace(/\ı+/g,'i')
      .toLowerCase()
      .replace(/&/g,'-and-')
      .replace(/[^a-z\-]/g,'')
      .replace(/-+/g,'')
      .replace(/^-*/,'')
      .replace(/-*$/,'')}`)
      
    if(username.length < 3) {
      usernameText.innerText = "Kullanıcı adı otomatik oluşturulur"
      usernameInput.remove("is-valid")
      usernameInput.remove("is-invalid")
    }
    else if(username == "@qwe") {
      //Username kullanılıyorsa

      usernameText.innerText = "Kullanıcı adı kullanılıyor"
      usernameInput.remove("is-valid")
      usernameInput.add("is-invalid")
    }
    else {
      //Username boşta ise

      usernameText.innerText = "Kullanıcı adı boşta!"
      usernameInput.remove("is-invalid")
      usernameInput.add("is-valid")
    }
  }

  const ctaControl = (s) => {
    const ctaButton = document.getElementById("ctaButton")

    if(s == 4) {
      ctaButton.removeAttribute("disabled", true)
    }
    else {
      ctaButton.setAttribute("disabled", true)
    }
  }

  return <>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Ad Soyad</label>
              <input id="name" type="text" className="input" autoFocus onChange={e => { makeUsername(e.target.value); }} />
            </div>

            <div className="form-field">
              <label>Kullanıcı Adı</label>
              <input id="username" type="text" className="input" value={username} readOnly tabIndex="-1" />
              <small className="input-text">Kullanıcı adı otomatik oluşturulur</small>
            </div>

            <div className="form-field">
              <label>Parola</label>
              <input id="password" type="password" onChange={e => setPassword(e.target.value)} className="input" />
              <PasswordStrengthBar
                scoreWords={["Çok Güçsüz", "Güçsüz", "Normal", "Güçlü", "Çok Güçlü"]}
                shortScoreWord="Çok Kısa"
                password={password}
                barColors={['#ddd', '#f44336', '#ffca28', '#23d160', '#26a69a']}
                onChangeScore={s => ctaControl(s)}
               />
            </div>

            <div>
              <input id="ctaButton" type="submit" value="Kayıt Ol" className="button is-primary is-block" disabled />
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}