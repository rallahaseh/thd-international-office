'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">thd-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' : 'data-target="#xs-components-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' :
                                            'id="xs-components-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApplyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InternationalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InternationalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabsDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabsDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabsReserveComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LabsReserveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LanguageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LanguageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' : 'data-target="#xs-injectables-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' :
                                        'id="xs-injectables-links-module-AppModule-c2bd7b2f419d2703992537a883179799088022566891c5d50404cfb41bcd8ab0f32688749476f4a5f22da49b0014d61b31562a8cdb25400ad6633406010b6164"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ErrorDialogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorDialogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/APIService.html" data-type="entity-link" >APIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpConfigInterceptor.html" data-type="entity-link" >HttpConfigInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Article.html" data-type="entity-link" >Article</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Lab.html" data-type="entity-link" >Lab</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Languages.html" data-type="entity-link" >Languages</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});