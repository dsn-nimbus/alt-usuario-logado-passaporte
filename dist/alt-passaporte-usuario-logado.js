;(function(ng) {
  "use strict";

  // {
  //   "nomeUsuario":"Cleive Canto Paqui",
  //   "nrTelefone":"9985666123",
  //   "idUsuario":1884,
  //   "assinantes": [
  //     {
  //       "identificacao":"36.462.778/0001-60",
  //       "produtos":
  //         [{"perfis":
  //             [{"nome":"Koopon - Contas - ADMIN",
  //               "id":24,
  //               "funcionalidades":
  //                 [{"nome":"Recusar Tarefa", "id":44},
  //                  {"nome":"Aceitar Tarefa","id":45},
  //                  {"nome":"Delegar Perfil Administrador","id":46},
  //                  {"nome":"Revogar Acesso","id":47}]
  //             }],
  //             "schema":"_000930",
  //             "database":"koopon",
  //             "idPerfil":24,
  //             "idDatabase":2,
  //             "nome":"Koopon Empresa",
  //             "id":15,
  //             "nomePerfil":"Koopon - Contas - ADMIN"
  //         }],
  //         "idExterno":"900000",
  //         "nome":"ALTERDATA TECNOLOGIA EM INFORMATICA LTDA",
  //         "id":2002
  //     }],
  //     "emailUsuario":"cpaqui_@gmail.com",
  //     "avatar":"https://lh6.googleusercontent.com/-sGZzk4Ls3cg/AAAAAAAAAAI/AAAAAAAAAJ8/lPj-xLwk3VM/photo.jpg",
  //     "contas":
  //       [{"conta":"facebook",
  //         "avatar":"https://graph.facebook.com/928597090492507/picture",
  //         "email":"cpaqui@gmail.com"},
  //
  //        {"conta":"Google",
  //         "avatar":"https://lh6.googleusercontent.com/-sGZzk4Ls3cg/AAAAAAAAAAI/AAAAAAAAAJ8/lPj-xLwk3VM/photo.jpg",
  //         "email":"cpaqui@gmail.com"},
  //
  //        {"conta":"Passaporte",
  //         "email":"cpaqui_@gmail.com"}
  //      ],
  //     "sexo":0
  // }

  ng.module('alt.passaporte-usuario-logado', ['emd.ng-xtorage'])
    .constant('ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO', 'pass_usuario_auth')
    .factory('AltPassaporteUsuarioLogadoModel', [function() {
        var Usuario = function(usuario) {
          this.nomeUsuario = '';
          this.nrTelefone = '';
          this.emailUsuario = '';
          this.avatar = '';
          this.contas = [];
          this.assinantes = [];
          this.sexo = 0;

          angular.extend(this, usuario);
          
          this._parseSexo();
        };

        Usuario.prototype._parseSexo = function() {
          switch(this.sexo) {
            case 0: this.sexo = {enum: 0, valor: "masculino"}; break;
            case 1: this.sexo = {enum: 1, valor: "feminino"}; break;
            case 2: this.sexo = {enum: 2, valor: "outro"}; break;
          }
        };

        Usuario.prototype._temConta = function(nomeConta) {
          var temConta = false;

          this.contas.forEach(function(c) {
            if (c && c.conta && (c.conta.toLowerCase() === nomeConta)) {
              return temConta = true;
            }
          });

          return temConta;
        };

        Usuario.prototype.temContaPassaporte = function() {
          return this._temConta("passaporte");
        };

        Usuario.prototype.temContaGoogle = function() {
          return this._temConta("google");
        };

        Usuario.prototype.temContaFacebook = function() {
            return this._temConta("facebook");
        };

        Usuario.prototype.temContaLinkedIn = function() {
            return this._temConta("linkedin");
        };

        return Usuario;
    }])
    .service('AltPassaporteUsuarioLogadoManager', ['$xtorage', 'AltPassaporteUsuarioLogadoModel', 'ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO', function($xtorage, AltPassaporteUsuarioLogadoModel, ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO) {
      this.salva = function salva(usuario) {
        $xtorage.save(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO, usuario);
      };

      this.retorna = function retorna() {
        return new AltPassaporteUsuarioLogadoModel($xtorage.get(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO));
      };

      this.remove = function remove() {
        $xtorage.remove(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO);
      };

      this.atualiza = function atualiza(usuario) {
        this.salva(usuario);
      };
    }]);
}(angular));
