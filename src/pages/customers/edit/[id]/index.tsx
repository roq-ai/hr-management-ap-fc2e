import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef, useMemo } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { useRoqClient, useCustomerFindFirst } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';
import { convertQueryToPrismaUtil } from 'lib/utils';
import { customerValidationSchema } from 'validationSchema/customers';
import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';

function CustomerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const roqClient = useRoqClient();
  const queryParams = useMemo(
    () =>
      convertQueryToPrismaUtil(
        {
          id,
        },
        'customer',
      ),
    [id],
  );
  const { data, error, isLoading, mutate } = useCustomerFindFirst(queryParams, {}, { disabled: !id });
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CustomerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await roqClient.customer.update({
        data: values as RoqTypes.customer,
        where: {
          id,
        },
      });
      mutate(updated);
      resetForm();
      router.push('/customers');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CustomerInterface>({
    initialValues: data,
    validationSchema: customerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Customers',
              link: '/customers',
            },
            {
              label: 'Update Customer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Customer
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.company_name}
            label={'Company Name'}
            props={{
              name: 'company_name',
              placeholder: 'Company Name',
              value: formik.values?.company_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.contact_name}
            label={'Contact Name'}
            props={{
              name: 'contact_name',
              placeholder: 'Contact Name',
              value: formik.values?.contact_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.contact_phone}
            label={'Contact Phone'}
            props={{
              name: 'contact_phone',
              placeholder: 'Contact Phone',
              value: formik.values?.contact_phone,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.contact_email}
            label={'Contact Email'}
            props={{
              name: 'contact_email',
              placeholder: 'Contact Email',
              value: formik.values?.contact_email,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/customers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'customer',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CustomerEditPage);
