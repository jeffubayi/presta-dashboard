<script setup lang="ts">
import { supabase } from "../supabase";
import {
  Modal,
  Input,
  Button,
  Navbar,
  NavbarLogo,
  NavbarCollapse,
  NavbarLink,
} from "flowbite-vue";
import { ref, toRefs, onMounted, reactive } from "vue";

const isShowModal = ref(false);
const isEditModal = ref(false);
const loading = ref(true);
const props = defineProps(["session"]);
const { session } = toRefs(props);
const customers = ref();
let count = ref();
const prevCount = ref(1);
const nextCount = ref(6);
const selectedCustomers = ref();
const name = ref("");
const phone = ref("");
const salesRep = ref("");
const used = ref();
const loan = ref();
const approved = ref();
const branch = ref("");
const email = ref("");
const searchItem = ref("");
const filteredSalesRep = ref("");
const filteredBranch = ref("");
const nameSearch = ref("name");
const salesSearch = ref("salesRep");
const branchSearch = ref("branch");
const branchItem = reactive([
  { id: 1, name: "HQ" },
  { id: 2, name: "Upper Hill" },
  { id: 3, name: "Kisumu" },
]);
const salesItem = reactive([
  { id: 1, name: "Jane Wahu" },
  { id: 2, name: "Tom Ogola" },
  { id: 3, name: "Sam Okoye" },
]);

//next page
const inc = async (startNumber: any, increment: any) => {
  const { data } = await supabase
    .from("customers")
    .select(`*`)
    .range(startNumber, increment);
  if (data) {
    customers.value = data;
    nextCount.value = increment;
    prevCount.value = startNumber;
  }
};

//prev page
const dec = async (startNumber: any, increment: any) => {
  const { data } = await supabase
    .from("customers")
    .select(`*`)
    .range(startNumber, increment);
  if (data) {
    customers.value = data;
    nextCount.value = increment;
    prevCount.value = startNumber;
  }
};

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

//get customers
async function getAllCustomers() {
  try {
    loading.value = true;

    const { data, error, status } = await supabase
      .from("customers")
      .select(`*`)
      .range(0, 5);

    const { data: totalCount } = await supabase.from("customers").select(`*`);
    if (error && status !== 406) throw error;
    if (data) {
      customers.value = data;
      count.value = totalCount?.length;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

//filter customers
async function search(value: string, target: any) {
  console.log(`sat`, value.length, target);
  try {
    if (value.length > 0) {
      const { data, error } = await supabase
        .from("customers")
        .select(`*`)
        .like(`${target}`, value);

      if (error) throw error;
      if (data) {
        customers.value = data;
      }
    } else {
      getAllCustomers();
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

//post customers
const addCustomer = async () => {
  console.log(`add values`, used.value);
  try {
    const customerData = {
      id: Date.now(),
      name: name.value,
      branch: branch.value,
      phone: phone.value,
      salesRep: salesRep.value,
      used: used.value || false,
      loan: loan.value,
      approved: approved.value,
      email: email.value,
    };

    const { error } = await supabase.from("customers").insert(customerData);
    if (error) throw error;
    isShowModal.value = false;
    getAllCustomers();
  } catch (error) {
    console.log(error);
  }
};

//delete customer
async function deleteCustomer(payload: { id: string }) {
  try {
    let { error, status } = await supabase
      .from("customers")
      .delete()
      .match({ id: payload.id });

    if (error && status !== 406) throw error;
    getAllCustomers();
  } catch (error) {
    console.log(error);
  }
}

//edit customer
async function updateCustomer(payload: { id: string }) {
  try {
    const customerData = {
      id: payload.id,
      name: name.value,
      branch: branch.value,
      phone: phone.value,
      salesRep: salesRep.value,
      used: used.value,
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
    getAllCustomers();
  } catch (error) {
    console.log(error);
  }
}

//log out user
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
    <!-- navbar -->
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
            {{ session?.value?.user?.email || "kibe@presta.co.ke" }}
          </div>
        </div>
      </div>

      <Button outline color="default" size="xs" @click="signOut">
        Sign out
      </Button>
    </template>
  </Navbar>




    <!--edit modal -->
  <Modal size="md" v-if="isEditModal" @close="closeEditModal">
    <template #header>
      <p>
        Edit Customer: <b>{{ selectedCustomers.name }}</b>
      </p>
    </template>
    <template #body>
      <form
        ref="anyName"
        class="space-y-3"
        is-form
        @submit.prevent="addCustomer"
      >
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
            :value="selectedCustomers.phone"
            required
            size="sm"
            type="text"
          />
        </div>
        <div>
          <Input
            label="Email Address"
            v-model="email"
            required
            size="sm"
            type="text"
            :value="selectedCustomers.email"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Branch</label
          >
          <select
            v-model="branch"
            :initialValue="selectedCustomers.branch"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select branch</option>
            <option value="HQ">HQ</option>
            <option value="Upper Hill">Upper Hill</option>
            <option value="kisumu">Kisumu</option>
          </select>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Sales Rep</label
          >
          <select
            v-model="salesRep"
            :initialValue="selectedCustomers.salesRep"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select sales Rep</option>
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
            type="text"
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
                type="text"
                size="sm"
              />
            </div>
          </div>
          <div class="flex items-start">
            <input
              type="checkbox"
              id="checkbox"
              v-model="used"
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
            <label for="checkbox">used</label>
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




  <!-- create modal -->
  <Modal size="md" v-if="isShowModal" @close="closeModal">
    <template #header>
      <p>New Customer</p>
    </template>
    <template #body>
      <form class="space-y-4" @submit.prevent="addCustomer">
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            type="text"
            v-model="name"
            required
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone Number</label
          >
          <input
            v-model="phone"
            required
            type="tel"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email Address</label
          >
          <input
            v-model="email"
            required
            type="email"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="approved"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Loan</label
          >
          <input
            v-model="loan"
            required
            type="number"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Branch</label
          >
          <select
            id="underline_select"
            v-model="branch"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Branch</option>
            <option
              v-for="item in branchItem"
              :value="item.name"
              :key="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Sales Rep</label
          >
          <select
            v-model="salesRep"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Sales Rep</option>
            <option v-for="item in salesItem" :value="item.name" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="flex justify-between">
          <div class="flex items-start">
            <div>
              <label
                for="approved"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Approved</label
              >
              <input
                label="Approved"
                v-model="approved"
                required
                type="number"
                size="sm"
                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div class="flex items-start">
            <div>
              <input
                type="checkbox"
                id="checkbox"
                v-model="used"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
              <label for="checkbox">used</label>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex justify-evenly gap-2">
        <button
          @click="addCustomer"
          type="button"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          @click="closeModal"
          type="button"
          class="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
            <div class="flex justify-start gap-2">
              <form class="flex items-center">
                <select
                  v-model="filteredBranch"
                  @input="search(filteredBranch, branchSearch)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Branch</option>
                  <option
                    v-for="item in branchItem"
                    :value="item.name"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </form>
              <form class="flex items-center">
                <select
                  v-model="filteredSalesRep"
                  @input="search(filteredSalesRep, salesSearch)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Sales Rep</option>
                  <option
                    v-for="item in salesItem"
                    :value="item.name"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </form>
            </div>
            <form class="flex items-center">
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  @input="search(searchItem, nameSearch)"
                  size="sm"
                  v-model="searchItem"
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for..."
                  required
                />
              </div>
            </form>
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
          <td class="px-4 py-4 text-right">
            <Button size="sm" @click="showEditModal(customer)"> Edit </Button>
          </td>
          <td class="px-4 py-4">
            <Button size="sm" color="red" @click="deleteCustomer(customer)">
              <svg
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex items-center space-x-3">
      <Button color="dark" @click="dec(0, 5)" outline square>
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Button>

      <Button color="dark" outline @click="inc(6, 12)" square>
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Button>
    </div>
    <div class="flex items-center mb-4 sm:mb-0">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
        >Showing
        <span class="font-semibold text-gray-900 dark:text-white"
          >{{ prevCount }}-{{ nextCount }}</span
        >
        of
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ count }}</span
        ></span
      >
    </div>
  </div>
</template>
