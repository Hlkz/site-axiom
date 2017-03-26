import db from '../../njb/database'

function Load(req, res, isContent) { return new Promise((resolve, reject) => {
  let get = req.query
  let post = req.body
  if (post && post.article_submit) {
    if (post.article_id) {
      db.query_c('DELETE FROM article WHERE id=?', post.article_id, () => {
        db.query_c('INSERT INTO article (id, title, content) VALUES (?,?,?)', post.article_id, post.article_title, post.article_content, () => {
        res.redirect(req.headers.referer)
      }) })
    } else
      db.query_c('INSERT INTO article (id, title, content) VALUES (?,?,?)', post.article_id, post.article_title, post.article_content, () => {
        res.redirect(req.headers.referer)
      })
  }
  else if (get && get.delete_article_id) {
    db.query_c('DELETE FROM article WHERE id=?', get.delete_article_id, () => {
      res.redirect(req.headers.referer)
    })
  }
  else if (get && get.id) {
    db.query_c('SELECT id, title, content FROM article WHERE id=?', get.id, row => {
      if (row.length) {
        let article = row[0]
        res.setData('modifyArticle', article)
        resolve()
      } else
        resolve()
    })
  }
  else
    resolve()
})}

let pug = `

.main-content
  .page-content.align
    form.editable-spec(name='article-form', method='post')
      div(style='height: 34px')
        label Id: 
        !=t.getEditableDiv('editable-id', 'article_id', modifyArticle?modifyArticle.id:'')
        label.ml Nom: 
        !=t.getEditableDiv('editable-title', 'article_title', modifyArticle?modifyArticle.title:'')
      #editable-content.editable-div
      .spectoolbar
        .editable-content_view
          input(type='button', value='Modifier', onclick='editable_switchToEdit(event)', editable-id='editable-content')
          input(type='button', value='Identifier')
        .editable-content_edit
          input#editable-content_save(type='submit', name='article_submit', value='Sauvegarder', onclick='editable_switchBack(this, true)', editable-id='editable-content')
          input#editable-content_cancel(type='button', value='Annuler', onclick='editable_switchBack(this, false)', editable-id='editable-content')
          input(type='button', value='Réinitialiser', onclick='editable_resetTextarea(event)', editable-id='editable-content')
      .specredline
      .editable-content_view(onclick='editable_switchToEdit(event)', style='width: 100%')
        #editable-content_textdiv.editable-textdiv.specdiv
      .editable-content_edit
        textarea#editable-content_textarea_real(name='article_content', style='display: none')
          !=modifyArticle?modifyArticle.content:''
        .editable-textarea-parent
          div
          textarea#editable-content_textarea.editable-textarea(style='width: 100%')
      .specredline
      #specselected.editable-content_view
`

module.exports = {
  Load,
  pug,
}
