# webpack-dotnet-kapu
Bare bones project for dotnet and webpack hybrib setup

# Setup Project  🚧

## __Prerequisites__:

- __Node e npm__ installati con versione __maggiore o uguale__ a quella indicata nel __package.json/engines__ (si puo installare ed utilizzare nvm per windows, nota: per installare nuova versione node va eseguito da powershell con privilegi di amministratore)
- __Chocolately__ (un gestore di pacchetti, tipo npm ma per Windows). [Link per l'installazione](https://chocolatey.org/install)
- __Dart-sdk__ con il comando choco install dart-sdk  da powershell con permessi di amministratore; digitare `yes` ad ogni richiesta di installazione di altri script fino a conclusione del processo

## __Visual Studio configuration__:

- Su VS, dal menu aprite __Extensions > Menage Extensions__, cercate il pacchetto __NPM task runner__ e installatelo e fate lo stesso con __Markdown Editor v2__ (è necessario chiudere VS ed eventualmente cliccare su "end process" se compare l'alert).
- Finita l’installazione delle estensioni riaprite VS
- Dal menu aprite __tools > options__ cercate npm e settate le location in modo che la prima sia PATH (è quella settata da NVM) e che la vecchia dipendenza da Node 8.15 sia disattivata (unchecked)

## __Install node packages__:
- Da windows file explorer __eliminate__ la cartella _node_modules_ e il file _package-lock.json_ se li avete
- Click destro sul file package.json e selezionare Restore packages ed attendere la fine del processo di installazione
A questo punto, nel Task Runner Explorer dovreste vedere i task specificati nel file package.json, se non li vedete cliccate con il destro sul file package.json e selezionate: __Task Runner Explorer__

## __Final steps__:
- Mettete in chekcout il file: `./Views/Shared/_Layout.cshtml` 👈
- Fare una copia del file Views/Shared/___Layout.cshtml__ e rinominarla ___LayoutTemplate.cshtml__ ed inserire i seguenti snippet in head per il css e body per il js

&nbsp;

# Start up Project 🚀

### Main tasks for dev e prod workflows:
- `build:serve`: avvia la compilazione iniziale ed un server di svipuppo capace di fare hot reload 🔥 di css e js: tutto quello di cui c’è bisogno per lo sviluppo web.
- `build:prod`: avvia la compilazione degli asset statici ottimizzati per l'ambiente di produzione con minificazione, tree shaking, hasnames etc. (nota se eslint rileva errori js il processo fallisce, così non si rischa di mandare in prod codice buggato 🐛)

### Utility tasks:
- `build:dev`: avvia la compilazione degli asset statici senza ottimizzazioni (come build serve ma senza il server)
- `lint`: Controllo errori js con esLint
- `clean`: Elimina la cartella `./Content/dist` (non è necessario farlo manualmente webpack lo fa già prima di ogni `build` task)

### Other tasks:
- `watch`: come build:dev ma in più ricompila on save (non consigliato: usa `build:serve`)

&nbsp;
------
&nbsp;

### Task `build:serve` notes:

- __CSHTML__: contrariamente alle modifiche ai files _js_ e _scss_ che vengono applicate on-save e senza bisogno di refreshare la pagina, per i files __html/cshtml__ è invece __necessario refreshare__ la pagina manualmente 🚴️


### **_LayoutTemplate.cshtml**
- nella cartella `Views/Shared` è stato aggiunto **_LayoutTemplate.cshtml** che è il file utilizzato come template da webpack per inserire js e css generando un nuovo file **_Layout.cshtml** che sovrascrive il vecchio (questo accade con tutti i tasks `build:...`). Per ciò ogni modifica va fatta __usando esclusivamente__ *_LayoutTemplate.cshtml*

    #### In breve la regola è: __non toccare__ *_Layout* ma lavora invece su **_LayoutTemplate**!

### __Nice to know__:
- Il __CSS__ in _development_ mode (`build:serve` e `build:dev`) non viene emesso in un file ma embeddato con uno \<style /\> tag nell' _head della pagina_.
- Le __immagini__ (png|jpg|gif|svg) presenti nell'scss con dimensione < 5kb non vengono emesse come file ma embeddate come data URI nel file css emesso ✨
