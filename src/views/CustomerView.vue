<script setup lang="ts">
import { supabase } from "../supabase";
import {
  Tabs,
  Tab,
  Modal,
  Input,
  Button,
  Navbar,
  NavbarLogo,
  NavbarCollapse,
  NavbarLink,
  Dropdown,
  ListGroup,
  ListGroupItem,
} from "flowbite-vue";
import { ref, toRefs, onMounted } from "vue";

const isShowModal = ref(false);
const isEditModal = ref(false);
const loading = ref(true);
const props = defineProps(["session"]);
const { session } = toRefs(props);
const customers = ref();
const selectedCustomers = ref();
const name = ref("");
const phone = ref("");
const salesRep = ref("");
const used = ref();
const loan = ref();
const approved = ref();
const branch = ref("");
const email = ref("");

console.log(`session data`, session);

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}
async function closeEditModal() {
  isEditModal.value = false;
}
function showEditModal(payload: any) {
  isEditModal.value = true;
  selectedCustomers.value = payload;
}

onMounted(() => {
  getAllCustomers();
});

async function getAllCustomers() {
  try {
    loading.value = true;

    const { data, error, status } = await supabase
      .from("customers")
      .select(`*`);

    if (error && status !== 406) throw error;
    if (data) {
      customers.value = data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

//post
const addCustomer = async () => {
  try {
    const customerData = {
      id: Date.now(),
      name: name.value,
      branch: branch.value || "HQ",
      phone: phone.value,
      salesRep: salesRep.value || "Jane Wahu",
      used: used.value || false,
      loan: loan.value,
      approved: approved.value,
      email: email.value,
    };

    const { error } = await supabase.from("customers").insert(customerData);
    if (error) throw error;
    isShowModal.value = false;
  } catch (error) {
    console.log(error);
  }
};

//delete
async function deleteCustomer(payload: { id: any }) {
  try {
    let { error, status } = await supabase
      .from("customers")
      .delete()
      .match({ id: payload.id });

    if (error && status !== 406) throw error;
  } catch (error) {
    console.log(error);
  }
}

//edit
async function updateCustomer(payload: { id: any }) {
  try {
    const customerData = {
      id: payload.id,
      name: name.value,
      branch: branch.value,
      phone: phone.value,
      salesRep: salesRep.value,
      used: used.value || false,
      loan: loan.value,
      approved: approved.value,
      email: email.value,
    };
    console.log(`CUS`, customerData);
    let { error, status } = await supabase
      .from("customers")
      .upsert(customerData)
      .match({ id: payload.id });

    if (error && status !== 406) throw error;
    isEditModal.value = false;
  } catch (error) {
    console.log(error);
  }
}

//signout
async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <Navbar>
    <template #logo>
      <NavbarLogo
        link="/"
        alt="Presta"
        image-url="https://www.presta.co.ke/assets/logo-7ca6d1fb.svg"
      >
        Presta Capital
      </NavbarLogo>
    </template>
    <template #default="{ isShowMenu }">
      <NavbarCollapse :isShowMenu="isShowMenu">
        <NavbarLink>Home</NavbarLink>
        <NavbarLink is-active>Customers</NavbarLink>
        <NavbarLink>Loans</NavbarLink>
      </NavbarCollapse>
    </template>
    <template #right-side>
      <div class="flex items-center space-x-4 mx-1">
        <img
          class="w-9 h-9 rounded-full"
          src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
          alt=""
        />
        <div class="font-medium dark:text-white">
          <div>Dickson Kibe</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            kibe@presta.co.ke
          </div>
        </div>
      </div>

      <Button outline color="default" size="xs" @click="signOut">
        Sign out
      </Button>
    </template>
  </Navbar>

  <Modal size="md" v-if="isEditModal" @close="closeEditModal">
    <template #header>
      <p>Edit Customer {{ selectedCustomers.name }}</p>
    </template>
    <template #body>
      <form class="space-y-3" is-form @submit.prevent="addCustomer">
        <div>
          <Input
            label="Name"
            v-model="name"
            required
            size="sm"
            :value="selectedCustomers.name"
          />
        </div>
        <div>
          <Input
            label="Phone Number"
            v-model="phone"
            required
            size="sm"
            :value="selectedCustomers.phone"
          />
        </div>
        <div>
          <Input
            label="Email Address"
            v-model="email"
            required
            size="sm"
            :value="selectedCustomers.email"
          />
        </div>
        <div>
          <Input
            v-model="branch"
            :initialValue="selectedCustomers.branch"
            label="Branch"
            required
            size="sm"
          />
        </div>
        <div>
          <Input
            select
            v-model="salesRep"
            :value="selectedCustomers.salesRep"
            label="Sales Rep"
            required
            size="sm"
          />
        </div>
        <div>
          <Input
            label="Loan"
            v-model="loan"
            required
            :value="selectedCustomers.loan"
            size="sm"
          />
        </div>
        <div class="flex justify-between">
          <div class="flex items-start">
            <div class="flex items-center h-5 mt-3 mb-1">
              <Input
                label="Approved"
                v-model="approved"
                required
                :value="selectedCustomers.approved"
                size="sm"
              />
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                :value="selectedCustomers.used"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Used</label
            >
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-evenly gap-2">
        <button
          @click="updateCustomer(selectedCustomers)"
          type="button"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
        <button
          @click="closeEditModal"
          type="button"
          class="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>

  <Modal size="md" v-if="isShowModal" @close="closeModal">
    <template #header>
      <p>New Customer </p>
    </template>
    <template #body>
          <form class="space-y-4" is-form @submit.prevent="addCustomer">
            <div>
              <Input label="Name" v-model="name" required size="sm" />
            </div>
            <div>
              <Input
                label="Phone Number"
                v-model="phone"
                required
                size="sm"
              />
            </div>
            <div>
              <Input
                label="Email Address"
                v-model="email"
                required
                size="sm"
              />
            </div>
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Branch</label
              >
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a branch</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Mombasa">HQ</option>
              </select>
            </div>
            <div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Sales Rep</label
              >
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a sales Rep</option>
                <option value="Jane Wahu">Jane Wahu</option>
                <option value="Tom Ogola">Tom Ogola</option>
                <option value="Sam Okoye">Sam Okoye</option>
              </select>
            </div>
            <div>
              <Input
                label="Loan"
                v-model="loan"
                required
                size="sm"
              />
            </div>
            <div class="flex justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5 mt-2 mb-1">
                  <Input
                    label="Approved"
                    v-model="approved"
                    required
                    size="sm"
                  />
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Used</label
                >
              </div>
            </div>
          </form>
    </template>
    <template #footer>
      <div class="flex justify-evenly gap-2">
        <button
          @click="addCustomer"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          @click="closeModal"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <caption
        class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        <div class="flex flex-row mb-2 justify-between">
          <div>
            <h3>Customers Listing</h3>
            <p
              class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"
            >
              A list of all customer data
            </p>
          </div>
          <Button
            @click="showModal"
            size="sm"
            type="button"
            class="m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            New Customer
          </Button>
        </div>
        <form>
          <div class="flex justify-between">
            <dropdown text="Filter by">
              <list-group>
                <list-group-item> Label </list-group-item>
                <list-group-item> Branch </list-group-item>
                <list-group-item> Sales Rep </list-group-item>
              </list-group>
            </dropdown>
            <Input size="sm" placeholder="Search for...">
              <template #prefix>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </template>
            </Input>
          </div>
        </form>
      </caption>

      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Phone Number</th>
          <th scope="col" class="px-6 py-3">Branch</th>
          <th scope="col" class="px-6 py-3">Sales Rep</th>
          <th scope="col" class="px-6 py-3">Approved</th>
          <th scope="col" class="px-6 py-3">Loan</th>
          <th scope="col" class="px-6 py-3">Used</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div class="flex items-center space-x-4">
              <img
                class="w-8 h-8 rounded-full"
                src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
                alt=""
              />
              <div class="font-medium dark:text-white">
                <div>{{ customer.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ customer.id }}
                </div>
              </div>
            </div>
          </th>
          <td class="px-6 py-4">
            <div class="font-medium dark:text-white">
              <div>{{ customer.phone }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ customer.email }}
              </div>
            </div>
          </td>
          <td class="px-6 py-4">{{ customer.branch }}</td>
          <td class="px-6 py-4">{{ customer.salesRep }}</td>
          <td class="px-6 py-4">{{ customer.approved }}</td>
          <td class="px-6 py-4">{{ customer.loan }}</td>
          <td class="px-6 py-4">
            <span
              v-if="customer.used == false"
              class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
              >No</span
            >
            <span
              v-if="customer.used == true"
              class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              >Yes</span
            >
          </td>
          <td class="px-6 py-4 text-right">
            <Button size="sm" outline @click="showEditModal(customer)">
              Edit
            </Button>
          </td>
          <td>
            <Button
              size="sm"
              outline
              color="red"
              @click="deleteCustomer(customer)"
            >
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
