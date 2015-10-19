"use strict";

describe('alt.passaporte-usuario-logado', function() {
  var AltPassaporteUsuarioLogadoModel, AltPassaporteUsuarioLogadoManager, ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO, _xtorage;
  var usuarioCompleto;

  beforeEach(module('alt.passaporte-usuario-logado'));

  beforeEach(inject(function($injector) {
    _xtorage = $injector.get('$xtorage');

    AltPassaporteUsuarioLogadoModel = $injector.get('AltPassaporteUsuarioLogadoModel');
    AltPassaporteUsuarioLogadoManager = $injector.get('AltPassaporteUsuarioLogadoManager');
    ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO = $injector.get('ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO');

    usuarioCompleto = {
      nomeUsuario: 'eric',
      emailUsuario: 'eric@gmail.com',
      nrTelefone: '21999999999',
      avatar: 'https://fotos.com.br/foto123.png',
      sexo: 0,
      assinantes: [],
      contas: [],
      infoAdicional: true
    };

    spyOn(_xtorage, 'save').and.callFake(angular.noop);
    spyOn(_xtorage, 'remove').and.callFake(angular.noop);
  }));

  describe('constantes', function() {
    describe('criação', function() {
      it('deve ter o valor correto para a constante de chave_usuario', function() {
        expect(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO).toEqual('pass_usuario_auth');
      })
    });
  });

  describe('modelo', function() {
      describe('criação', function() {
        it('deve ter o constructor como uma fucntion', function() {
          expect(typeof AltPassaporteUsuarioLogadoModel).toBe('function');
        });
      });

      describe('instância', function() {
        it('deve ter as propriedades com os valores corretos - instância vazia', function() {
            var _usuario = new AltPassaporteUsuarioLogadoModel();

            expect(_usuario.nomeUsuario).toBe('');
            expect(_usuario.emailUsuario).toBe('');
            expect(_usuario.nrTelefone).toBe('');
            expect(_usuario.avatar).toBe('');
            expect(_usuario.assinantes).toEqual([]);
            expect(_usuario.contas).toEqual([]);
            expect(_usuario.sexo).toEqual({enum: 0, valor: "masculino"});
        });


        it('deve ter as propriedades com os valores corretos - instância completa', function() {
            var _usuario = new AltPassaporteUsuarioLogadoModel(usuarioCompleto);

            expect(_usuario.nomeUsuario).toBe(usuarioCompleto.nomeUsuario);
            expect(_usuario.emailUsuario).toBe(usuarioCompleto.emailUsuario);
            expect(_usuario.nrTelefone).toBe(usuarioCompleto.nrTelefone);
            expect(_usuario.avatar).toBe(usuarioCompleto.avatar);
            expect(_usuario.assinantes).toEqual(usuarioCompleto.assinantes);
            expect(_usuario.contas).toEqual(usuarioCompleto.contas);
            expect(_usuario.infoAdicional).toBe(usuarioCompleto.infoAdicional);
            expect(_usuario.sexo.enum).toBe(usuarioCompleto.sexo);
            expect(_usuario.sexo.valor).toBe("masculino");
        });
      });

      describe('_parseSexo', function() {

        it('deve ter o sexo como masculino, número passado: undefined', function() {
          var _usuario = new AltPassaporteUsuarioLogadoModel();

          expect(_usuario.sexo).toEqual({enum: 0, valor: "masculino"});
        });

        it('deve ter o sexo como masculino, número passado: 0', function() {
          var _usuario = new AltPassaporteUsuarioLogadoModel({sexo: 0});

          expect(_usuario.sexo).toEqual({enum: 0, valor: "masculino"});
        });

        it('deve ter o sexo como feminino, número passado: 1', function() {
          var _usuario = new AltPassaporteUsuarioLogadoModel({sexo: 1});

          expect(_usuario.sexo).toEqual({enum: 1, valor: "feminino"});
        });

        it('deve ter o sexo como outro, número passado: 2', function() {
          var _usuario = new AltPassaporteUsuarioLogadoModel({sexo: 2});

          expect(_usuario.sexo).toEqual({enum: 2, valor: "outro"});
        });
      });

      describe('temContaPassaporte', function() {
        it('deve retorna false, array de contas é vazio', function() {
            var _usuario = new AltPassaporteUsuarioLogadoModel({});

            expect(_usuario.temContaPassaporte()).toBe(false);
        });

        it('deve retorna false, array de contas tem conta, mas não passaporte', function() {
            var _contas = {contas: [{conta: 'qqcoisa'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaPassaporte()).toBe(false);
        });

        it('deve retorna true, array de contas tem conta passaporte em MAIUSCULO', function() {
            var _contas = {contas: [{conta: 'PASSAPORTE'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaPassaporte()).toBe(true);
        });

        it('deve retorna true, array de contas tem conta passaporte em MINUSCULO', function() {
            var _contas = {contas: [{conta: 'passaporte'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaPassaporte()).toBe(true);
        });
      })

      describe('temContaGoogle', function() {
        it('deve retorna false, array de contas é vazio', function() {
            var _usuario = new AltPassaporteUsuarioLogadoModel({});

            expect(_usuario.temContaGoogle()).toBe(false);
        });

        it('deve retorna false, array de contas tem conta, mas não google', function() {
            var _contas = {contas: [{conta: 'qqcoisa'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaGoogle()).toBe(false);
        });

        it('deve retorna true, array de contas tem conta google em MAIUSCULO', function() {
            var _contas = {contas: [{conta: 'GOOGLE'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaGoogle()).toBe(true);
        });

        it('deve retorna true, array de contas tem conta google em MINUSCULO', function() {
            var _contas = {contas: [{conta: 'google'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaGoogle()).toBe(true);
        });
      })

      describe('temContaFacebook', function() {
        it('deve retorna false, array de contas é vazio', function() {
            var _usuario = new AltPassaporteUsuarioLogadoModel({});

            expect(_usuario.temContaFacebook()).toBe(false);
        });

        it('deve retorna false, array de contas tem conta, mas não facebook', function() {
            var _contas = {contas: [{conta: 'qqcoisa'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaFacebook()).toBe(false);
        });

        it('deve retorna true, array de contas tem conta facebook em MAIUSCULO', function() {
            var _contas = {contas: [{conta: 'facebook'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaFacebook()).toBe(true);
        });

        it('deve retorna true, array de contas tem conta facebook em MINUSCULO', function() {
            var _contas = {contas: [{conta: 'facebook'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaFacebook()).toBe(true);
        });
      });

      describe('temContaLinkedIn', function() {
        it('deve retorna false, array de contas é vazio', function() {
            var _usuario = new AltPassaporteUsuarioLogadoModel({});

            expect(_usuario.temContaLinkedIn()).toBe(false);
        });

        it('deve retorna false, array de contas tem conta, mas não linkedin', function() {
            var _contas = {contas: [{conta: 'qqcoisa'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaLinkedIn()).toBe(false);
        });

        it('deve retorna true, array de contas tem conta linkedin em MAIUSCULO', function() {
            var _contas = {contas: [{conta: 'linkedin'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaLinkedIn()).toBe(true);
        });

        it('deve retorna true, array de contas tem conta linkedin em MINUSCULO', function() {
            var _contas = {contas: [{conta: 'linkedin'}]};
            var _usuario = new AltPassaporteUsuarioLogadoModel(_contas);

            expect(_usuario.temContaLinkedIn()).toBe(true);
        });
      });
  });

  describe('Manager', function() {
    describe('criação', function() {
        it('deve ter o constructor como uma fucntion', function() {
          expect(typeof AltPassaporteUsuarioLogadoManager).toBe('object');
        });
    });

    describe('salva', function() {
      it('deve chamar o servico com os parâmetros corretos', function() {
        var _usuario = {a: true};

        AltPassaporteUsuarioLogadoManager.salva(_usuario);

        expect(_xtorage.save).toHaveBeenCalledWith(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO, _usuario);
      });
    });

    describe('retorna', function() {
      it('deve chamar o servico com os parâmetros corretos', function() {
        spyOn(_xtorage, 'get').and.callFake(angular.noop);

        AltPassaporteUsuarioLogadoManager.retorna();

        expect(_xtorage.get).toHaveBeenCalledWith(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO);
      });

      it('deve retornar uma instância do UsuarioLogado - storage vazia - undefined', function() {
        spyOn(_xtorage, 'get').and.returnValue(undefined);

        var usuario = AltPassaporteUsuarioLogadoManager.retorna();

        expect(usuario).toBeDefined();
        expect(usuario instanceof AltPassaporteUsuarioLogadoModel).toBe(true);
      });

      it('deve retornar uma instância do UsuarioLogado - storage vazia - null', function() {
        spyOn(_xtorage, 'get').and.returnValue(null);

        var usuario = AltPassaporteUsuarioLogadoManager.retorna();

        expect(usuario).toBeDefined();
        expect(usuario instanceof AltPassaporteUsuarioLogadoModel).toBe(true);
      });

      it('deve retornar uma instância do UsuarioLogado - storage com objeto vazio - {}', function() {
        spyOn(_xtorage, 'get').and.returnValue(null);

        var usuario = AltPassaporteUsuarioLogadoManager.retorna();

        expect(usuario).toBeDefined();
        expect(usuario instanceof AltPassaporteUsuarioLogadoModel).toBe(true);
      });

      it('deve retornar uma instância do UsuarioLogado - storage preenchida', function() {
        spyOn(_xtorage, 'get').and.returnValue({qqCoisa: true});

        var usuario = AltPassaporteUsuarioLogadoManager.retorna();

        expect(usuario).toBeDefined();
        expect(usuario instanceof AltPassaporteUsuarioLogadoModel).toBe(true);
        expect(usuario.qqCoisa).toBe(true);
      });
    });

    describe('remove', function() {
      it('deve chamar o servico com os parâmetros corretos', function() {
        AltPassaporteUsuarioLogadoManager.remove();

        expect(_xtorage.remove).toHaveBeenCalledWith(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO);
      });
    });

    describe('atualiza', function() {
      it('deve chamar o servico com os parâmetros corretos', function() {
        var _usuario = {a: true};

        AltPassaporteUsuarioLogadoManager.atualiza(_usuario);

        expect(_xtorage.save).toHaveBeenCalledWith(ALT_PASSAPORTE_CHAVE_USUARIO_LOGADO, _usuario);
      });
    });
  });
});
