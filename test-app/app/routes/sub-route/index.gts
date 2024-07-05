import Route from 'ember-routable-component';
import ControllerWorksController from 'test-app/controllers/controller-works';

interface Signature {
  Args: {
    controller: ControllerWorksController;
  };
}

export default Route<Signature>(<template>hello sub route</template>);
