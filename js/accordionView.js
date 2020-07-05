import ComponentView from 'core/js/views/componentView';

class AccordionView extends ComponentView {

  preRender() {
    this.checkIfResetOnRevisit();
    this.model.resetActiveItems();
    this.listenTo(this.model.get('_children'), {
      'change:_isActive': this.onItemsActiveChange,
      'change:_isVisited': this.onItemsVisitedChange,
      'all': this.changed
    });
  }

  postRender() {
    this.setReadyStatus();
    if (this.model.get('_setCompletionOn') === 'inview') {
      this.setupInviewCompletion();
    }
  }

  checkIfResetOnRevisit() {
    var isResetOnRevisit = this.model.get('_isResetOnRevisit');
    // If reset is enabled set defaults
    if (isResetOnRevisit) {
      this.model.reset(isResetOnRevisit);
    }
  }

  onClick(event) {
    event.preventDefault();
    this.model.toggleItemsState($(event.currentTarget).parent().data('index'));
  }

  onItemsActiveChange(item, isActive) {
    this.toggleItem(item, isActive);
  }

  toggleItem(item, shouldExpand) {
    var $item = this.getItemElement(item);
    var $body = $item.children('.accordion__item-content').stop(true, true);
    if (!shouldExpand) {
      $body.slideUp(this.model.get('_toggleSpeed'));
      return;
    }
    $body.slideDown(this.model.get('_toggleSpeed'));
  }

  getItemElement(item) {
    var index = item.get('_index');
    return this.$('.accordion__item').filter('[data-index="' + index +'"]');
  }

}

AccordionView.template = 'accordion.jsx';

export default AccordionView;
