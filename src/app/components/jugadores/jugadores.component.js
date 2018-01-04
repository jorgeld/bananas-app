"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jugadores_service_1 = require("../jugadores/jugadores.service");
var Rx_1 = require("rxjs/Rx");
var JugadoresComponent = (function () {
    function JugadoresComponent(_jugadoresService, _appComponent) {
        this._jugadoresService = _jugadoresService;
        this._appComponent = _appComponent;
        this.listadojugadores = [];
        this.pivots = [];
        this.ala_pivots = [];
        this.aleros = [];
        this.escoltas = [];
        this.bases = [];
        this.getJugadores = function () {
            var _this = this;
            var self = this;
            this._jugadoresService.getJugadoresRest()
                .subscribe(function (result) {
                _this.listadojugadores = result.jugadores;
                _this.pivots = _this.listadojugadores.filter(function (j) { return j.posicion == 'PIVOT'; });
                _this.ala_pivots = _this.listadojugadores.filter(function (j) { return j.posicion == 'ALA-PIVOT'; });
                _this.aleros = _this.listadojugadores.filter(function (j) { return j.posicion == 'ALERO'; });
                _this.escoltas = _this.listadojugadores.filter(function (j) { return j.posicion == 'ESCOLTA'; });
                _this.bases = _this.listadojugadores.filter(function (j) { return j.posicion == 'BASE'; });
            }, function (error) {
                console.log("Error al llamar servicio getJugadores()");
                alert(error);
            });
        };
        this.newJugador = function () {
            var _this = this;
            this._jugadoresService.newJugador()
                .subscribe(function (result) {
                _this.getJugadores();
            }, function (error) {
                console.log("Error al crear jugador ----> " + error);
                alert(error);
            });
        };
        this.newJugadorByPosition = function (data) {
            var _this = this;
            var bodyParse = {
                'puesto': data,
            };
            this._jugadoresService.newJugador(bodyParse)
                .subscribe(function (result) {
                _this.getJugadores();
            }, function (error) {
                console.log("Error al crear jugador ----> " + error);
                alert(error);
            });
        };
        this.deleteJugador = function (idJugador) {
            var _this = this;
            this._jugadoresService.deleteJugador(idJugador)
                .subscribe(function (result) {
                console.log("Borrado correctamente : " + result);
                _this.getJugadores();
            }, function (error) {
                console.log("Error al eliminar jugador ----> " + error);
                alert(error);
            });
        };
        this.eliminarJugadores = function () {
            var _this = this;
            var observables = [];
            this.eliminarTodosJugadores = true;
            this.listadojugadores.forEach(function (jugador) {
                observables.push(_this._jugadoresService.deleteJugador(jugador._id));
            });
            Rx_1.Observable.forkJoin(observables)
                .subscribe(function (result) { }, function () { return console.log('error'); }, function () {
                _this.eliminarTodosJugadores = false;
                _this.getJugadores();
            });
        };
    }
    JugadoresComponent.prototype.ngOnInit = function () {
        this.getJugadores();
    };
    return JugadoresComponent;
}());
JugadoresComponent = __decorate([
    core_1.Component({
        selector: 'app-jugadores',
        templateUrl: './jugadores.component.html',
        styleUrls: ['./jugadores.component.css'],
        providers: [jugadores_service_1.JugadoresService]
    })
], JugadoresComponent);
exports.JugadoresComponent = JugadoresComponent;
