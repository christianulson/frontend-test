import {
  NgModule,
  Component,
  Directive,
  Input,
  ReflectiveInjector,
  ViewContainerRef,
  Compiler,
  ModuleWithComponentFactories,
  OnChanges,
  OnDestroy,
  ComponentFactoryResolver
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { ITalk } from '../interfaces/iTalk';
import { CaixaCandidatoComponent, CaixaRecrutadorComponent } from './';

const typeMap = {
  'candidato': CaixaCandidatoComponent,
  'recrutador': CaixaRecrutadorComponent
};

@Directive({
  selector: '[mensagem]'
})
export class MessageFactoryDirective implements OnChanges, OnDestroy {
  @Input() model: ITalk;
  componentRef;
  init = false;

  constructor(private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {
  }

  ngOnChanges() {
    if (!this.model || this.init) return;
    const comp = typeMap[this.model.type];
    console.log(this.model.type);
    console.log(this.model.type=='candidato'
        ? CaixaCandidatoComponent
        : CaixaRecrutadorComponent);
    if (comp) {
      this.createComponent(this.model.type=='candidato'
        ? CaixaCandidatoComponent
        : CaixaRecrutadorComponent);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      console.log("Destroy");
        this.componentRef.destroy();
        this.componentRef = null;
    }
  }

  private createComponent(comp) {
    const factory = this.resolver.resolveComponentFactory(comp);
    const compRef = this.vcRef.createComponent(factory);
    (<any>compRef).instance.model = this.model.talkMessages;
console.log('aqui');
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.componentRef = compRef;
    this.init = true;
  }
}